import { AxiosError } from 'axios';
import { ApiServiceBuilder } from './api.service';
import AuthService from './auth.service';
import type { Socket } from 'socket.io-client';
import { connect } from 'socket.io-client';
import type IMessage from '../models/interfaces/IMessage';
import type IConversation from '../models/interfaces/IConversation';
import { MessageTypes } from '../constants/enums';
import mediaServices from './media.services';
enum SocketEvent {
  Init = 'init',
  New = 'new',
  Update = 'update',
  Delete = 'delete',
}
class ConversationService {
  private static instance: ConversationService;
  public static getInstance(): ConversationService {
    if (ConversationService.instance === undefined || ConversationService.instance === null) {
      ConversationService.instance = new ConversationService();
    }
    return ConversationService.instance;
  }

  api(): ApiServiceBuilder {
    return new ApiServiceBuilder();
  }

  private socket: Socket | null = null;

  private readonly conversationsEventListeners: Array<(conversations: IConversation[]) => void> = [];

  private readonly messagesEventListeners: Array<(conversationId: string, messages: IMessage[]) => void> = [];

  public addConversationsEventListener(callback: (conversations: IConversation[]) => void): void {
    this.conversationsEventListeners.push(callback);
  }

  public addMessagesEventListener(callback: (conversationId: string, messages: IMessage[]) => void): void {
    this.messagesEventListeners.push(callback);
  }

  public removeConversationsEventListener(callback: (conversations: IConversation[]) => void): void {
    const index = this.conversationsEventListeners.indexOf(callback);
    if (index !== -1) {
      this.conversationsEventListeners.splice(index, 1);
    }
  }

  public removeMessagesEventListener(callback: (conversationId: string, messages: IMessage[]) => void): void {
    const index = this.messagesEventListeners.indexOf(callback);
    if (index !== -1) {
      this.messagesEventListeners.splice(index, 1);
    }
  }

  public notifyConversationsEventListeners(): void {
    this.conversationsEventListeners.forEach((callback) => {
      callback(this.conversations);
    });
  }

  public notifyMessagesEventListeners(conversationId: string): void {
    this.messagesEventListeners.forEach((callback) => {
      callback(conversationId, this.messages[conversationId]);
    });
  }

  public async getOrCreateConversation(otherUserId: string): Promise<{
    conversation: IConversation;
    isExist: boolean;
  }> {
    try {
      // const accessToken = await AuthService.getInstance().getAccessToken();
      const accessToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMWE5YTU3ODUtNzIxYS00YmI1LWJlYjctOWQ3NTJlMjA3MGQ0Iiwic2Vzc2lvbl9pZCI6IjcxMTM3MjE3LTk3NTEtNDcyMS05MWMyLTcyOWI4Y2MyMDU2NyIsImlhdCI6MTcwNTEzNDExNCwiZXhwIjoxNzA3NzI2MTE0fQ.vBNFB6szeFToK6rWKh6MxTriJXSUPhRfdJ56xVAA1Rk';
      const existingConversation = this.conversations.find(
        (conv) => conv.participants[0].user_id === otherUserId || conv.participants[1].user_id === otherUserId,
      );

      if (existingConversation !== undefined) {
        return {
          conversation: existingConversation,
          isExist: true,
        };
      }

      const response = await this.api()
        .withUrl('/conversations/' + otherUserId)
        .withHeaders({
          Authorization: `Bearer ${accessToken}`,
        })
        .build()
        .post();

      const { conversation, isExist } = (response.data as any).result;
      if (isExist === false) {
        this.conversations.push(conversation);
        this.notifyConversationsEventListeners();
      }
      return {
        conversation,
        isExist,
      };
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 404) {
        throw new Error('Không tìm thấy cuộc trò chuyện');
      }
      throw error;
    }
  }

  private conversations: IConversation[] = [];

  private messages: Record<string, IMessage[]> = {};

  private readonly handleConversationEvent = (type: SocketEvent, data: any) => {
    switch (type) {
      case SocketEvent.Init:
        this.conversations = data;
        break;
      case SocketEvent.New:
        this.conversations.push(data);
        break;
      case SocketEvent.Update: {
        const updateIndex = this.conversations.findIndex((conv) => conv.id === data.id);
        if (updateIndex !== -1) {
          this.conversations[updateIndex] = data;
        }
        break;
      }
      case SocketEvent.Delete: {
        const deleteIndex = this.conversations.findIndex((conv) => conv.id === data.id);
        if (deleteIndex !== -1) {
          this.conversations.splice(deleteIndex, 1);
        }
        break;
      }
      default:
        break;
    }
    this.notifyConversationsEventListeners();
  };

  private readonly handleMessageEvent = (type: SocketEvent, data: any) => {
    const { data: message, conversation_id: conversationId } = data;
    switch (type) {
      case SocketEvent.Init:
        this.messages[conversationId] = message;
        break;

      case SocketEvent.New:
        this.messages[conversationId].push(message);
        break;
      case SocketEvent.Update:
        {
          const updateIndex = this.messages[conversationId].findIndex((msg) => msg.id === message.id);
          if (updateIndex !== -1) {
            this.messages[conversationId][updateIndex] = message;
          }
        }
        break;
      case SocketEvent.Delete:
        {
          const deleteIndex = this.messages[conversationId].findIndex((msg) => msg.id === message.id);
          if (deleteIndex !== -1) {
            this.messages[conversationId].splice(deleteIndex, 1);
          }
        }
        break;
      default:
        break;
    }
    this.notifyMessagesEventListeners(conversationId);
  };

  public async getConversations(): Promise<IConversation[]> {
    return this.conversations;
  }

  public async getConversation(conversationId: string): Promise<IConversation | undefined> {
    return this.conversations.find((conv) => conv.id === conversationId);
  }

  public async getAllMessages(): Promise<Record<string, IMessage[]>> {
    return this.messages;
  }

  public async getMessages(conversationId: string): Promise<IMessage[] | undefined> {
    return this.messages[conversationId];
  }

  public async sendMessage(conversationId: string, content: string | File[]): Promise<void> {
    if (this.socket === null) {
      throw new Error('Socket is not connected');
    }
    // If content is array of files, upload them first
    if (Array.isArray(content)) {
      const result = await mediaServices.uploadFiles(content, true);
      this.socket.emit('send_message', {
        type: MessageTypes.media,
        conversation_id: conversationId,
        content: result,
      });
    } else {
      this.socket.emit('send_message', {
        type: MessageTypes.text,
        conversation_id: conversationId,
        content,
      });
    }
  }

  public initConversation(conversationId: string): void {
    if (this.socket === null) {
      throw new Error('Socket is not connected');
    }
    if (this.messages[conversationId] !== undefined) {
      this.notifyMessagesEventListeners(conversationId);
    }
    this.socket.emit('init_chat', {
      conversation_id: conversationId,
    });
  }

  public async initSocket(): Promise<void> {
    if (this.socket !== null) {
      return;
    }
    const accessToken = await AuthService.getInstance().getAccessToken();
    this.socket = connect('http://localhost:8000/conversations', {
      auth: {
        token: accessToken,
      },
    });

    this.socket.on('conversations', (data: { type: SocketEvent; data: any }) => {
      this.handleConversationEvent(data.type, data.data);
    });

    this.socket.on('messages', (data: { type: SocketEvent; data: any }) => {
      console.log('On messages: ', data);
      this.handleMessageEvent(data.type, data);
    });
  }

  public disconnectSocket(): void {
    if (this.socket !== null) {
      this.socket.disconnect();
    }
  }
}

export default ConversationService.getInstance();
