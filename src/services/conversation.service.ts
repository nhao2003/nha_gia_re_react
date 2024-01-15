import { AxiosError } from 'axios';
import { ApiServiceBuilder } from './api.service';
import AuthService from './auth.service';
import type { Socket } from 'socket.io-client';
import { connect } from 'socket.io-client';
import type IMessage from '../models/interfaces/IMessage';
import type IConversation from '../models/interfaces/IConversation';
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

  private conversationsEventListeners: Record<string, Array<(conversations: IConversation[]) => void>> = {};

  private messagesEventListeners: Record<string, Array<(conversationId: string, messages: IMessage[]) => void>> = {};

  public addConversationsEventListener(
    conversationId: string,
    callback: (conversations: IConversation[]) => void,
  ): void {
    if (this.conversationsEventListeners[conversationId] === undefined) {
      this.conversationsEventListeners[conversationId] = [];
    }
    this.conversationsEventListeners[conversationId].push(callback);
  }

  public addMessagesEventListener(
    conversationId: string,
    callback: (conversationId: string, messages: IMessage[]) => void,
  ): void {
    if (this.messagesEventListeners[conversationId] === undefined) {
      this.messagesEventListeners[conversationId] = [];
    }
    this.messagesEventListeners[conversationId].push(callback);
  }

    public removeConversationsEventListener(
        conversationId: string,
        callback: (conversations: IConversation[]) => void,
    ): void {
        if (this.conversationsEventListeners[conversationId] === undefined) {
        return;
        }
        const index = this.conversationsEventListeners[conversationId].indexOf(callback);
        if (index !== -1) {
        this.conversationsEventListeners[conversationId].splice(index, 1);
        }
    }

    public removeMessagesEventListener(
        conversationId: string,
        callback: (conversationId: string, messages: IMessage[]) => void,
    ): void {
        if (this.messagesEventListeners[conversationId] === undefined) {
        return;
        }
        const index = this.messagesEventListeners[conversationId].indexOf(callback);
        if (index !== -1) {
        this.messagesEventListeners[conversationId].splice(index, 1);
        }
    }

  public async getConversation(otherUserId: string): Promise<any> {
    try {
      // const accessToken = await AuthService.getInstance().getAccessToken();
      const accessToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMWE5YTU3ODUtNzIxYS00YmI1LWJlYjctOWQ3NTJlMjA3MGQ0Iiwic2Vzc2lvbl9pZCI6IjcxMTM3MjE3LTk3NTEtNDcyMS05MWMyLTcyOWI4Y2MyMDU2NyIsImlhdCI6MTcwNTEzNDExNCwiZXhwIjoxNzA3NzI2MTE0fQ.vBNFB6szeFToK6rWKh6MxTriJXSUPhRfdJ56xVAA1Rk';
      const response = await this.api()
        .withUrl('/conversations')
        .withBody({
          other_user_id: otherUserId,
        })
        .withHeaders({
          Authorization: `Bearer ${accessToken}`,
        })
        .build()
        .post();

      const { conversation, isExist } = (response.data as any).result;
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
  };

  private readonly handleMessageEvent = (type: SocketEvent, data: any) => {
    const { data: message, conversation_id: conversationId } = data;
    switch (type) {
      case SocketEvent.Init:
        console.log(SocketEvent.Init);
        this.messages[conversationId] = message;
        break;

      case SocketEvent.New:
        console.log(SocketEvent.New);
        this.messages[conversationId].push(message);
        break;
      case SocketEvent.Update:
        {
          console.log(SocketEvent.Update);
          const updateIndex = this.messages[conversationId].findIndex((msg) => msg.id === message.id);
          if (updateIndex !== -1) {
            this.messages[conversationId][updateIndex] = message;
          }
        }
        break;
      case SocketEvent.Delete:
        {
          console.log(SocketEvent.Delete);
          const deleteIndex = this.messages[conversationId].findIndex((msg) => msg.id === message.id);
          if (deleteIndex !== -1) {
            this.messages[conversationId].splice(deleteIndex, 1);
          }
        }
        break;
      default:
        break;
    }
  };

  public async initSocket(): Promise<void> {
    const accessToken = await AuthService.getInstance().getAccessToken();
    this.socket = connect('http://localhost:8000', {
      auth: {
        token: accessToken,
      },
    });

    this.socket.on('conversations', (data: { type: SocketEvent; data: any }) => {
      this.handleConversationEvent(data.type, data.data);
    });
  }

  public disconnectSocket(): void {
    if (this.socket !== null) {
      this.socket.disconnect();
    }
  }
}

export default { ConversationService };
