import React, { useEffect, useRef, useState } from 'react';
import { Box, Avatar, Typography, List, ListItemAvatar, ListItemText, Divider, ListItemButton } from '@mui/material';
import { connect } from 'socket.io-client';
import ChatContent from './components/ChatContent';
import type { MessageTypes } from '../../../../constants/enums';
import AuthService from '../../../../services/auth.service';
import { useNavigate } from 'react-router-dom';
import conversationService from '../../../../services/conversation.service';
import type Conversation from '../../../../models/interfaces/IConversation';
import type IMessage from '../../../../models/interfaces/IMessage';

enum SocketEvent {
  Init = 'init',
  New = 'new',
  Update = 'update',
  Delete = 'delete',
}

const host = 'http://localhost:8000/conversations';

function ModernChatPage() {
  const [messages, setMessages] = useState<Record<string, any[]>>({});
  const [conversations, setConversations] = useState<any>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const userId = AuthService.getInstance().getUserIdFromToken();

  function conversationListener(conversations: Conversation[]) {
    setConversations(conversations);
  }

  function messageListener(conversationId: string, messages: IMessage[]) {
    console.log('Message listener', conversationId, messages);
    setMessages((prev) => {
      return {
        ...prev,
        [conversationId]: messages,
      };
    });
  }



  const initializeSocket = async () => {
    await conversationService.initSocket();
    conversationService.addConversationsEventListener(conversationListener);
    conversationService.addMessagesEventListener(messageListener);
  };
  const navigate = useNavigate();
  useEffect(() => {
    initializeSocket().catch((err) => {
      console.log(err);
      // Go to login page
      navigate('/signin');
    });

    return () => {
      conversationService.removeConversationsEventListener(conversationListener);
      conversationService.removeMessagesEventListener(messageListener);
    };
  }, []);

  useEffect(() => {
    if (selectedConversation !== null) {
      conversationService.initConversation(selectedConversation);
    }
  }, [selectedConversation]);

  const [isXs, setIsXs] = useState(window.innerWidth < 600);

  useEffect(() => {
    if (listRef.current !== null) {
      console.log('Scroll to bottom');
      listRef.current.scrollTop = listRef.current.scrollHeight;
    } else {
      console.log('List ref is null');
    }
  }, [messages]);

  useEffect(() => {
    const handleResize = () => {
      setIsXs(window.innerWidth < 600);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      width: '100wh',
      overflowY: 'auto'
    }}>

      <List
        sx={{
          width: {
            xl: '25%',
            lg: '25%',
            md: '25%',
            sm: '25%',
            xs: '15%',
          },
          // overflowY: 'auto',
          backgroundColor: '#f5f5f5',
        }}
      >
        {conversations.map((conversation: any) => {
          const otherParticipant: any = conversation.participants.find((participant: any) => participant.user_id !== userId);
          const otherUser: any = conversation.users.find((user: any) => user.id === otherParticipant.user_id);
          return (
            <React.Fragment key={conversation.id}>
              <ListItemButton
                alignItems="flex-start"
                onClick={() => {
                  setSelectedConversation(conversation.id);
                  /// Set conversation id to url
                  navigate(`/chat/${otherParticipant.user_id}`);
                }}
                sx={{
                  backgroundColor: selectedConversation === conversation.id ? '#e0e0e0' : 'transparent',
                }
                }
              >
                <ListItemAvatar>
                  <Avatar alt={otherUser.first_name} src={otherUser.avatar} />
                </ListItemAvatar>
                {
                  !isXs &&
                  <ListItemText
                    primary={otherUser.first_name}
                    secondary={
                      <React.Fragment>
                        <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                          {conversation.last_message.content?.text ?? 'Bắt đầu cuộc trò chuyện'}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                }
              </ListItemButton>
              {
                !isXs &&
                <Divider variant="inset" component="li" />
              }
            </React.Fragment>
          );
        })}
      </List>
      <ChatContent
        messages={messages[selectedConversation ?? ''] ?? []}
        isNoChatSelected={selectedConversation === null}
        isFetching={messages[selectedConversation ?? ''] === undefined}
        myId={userId ?? ''}
        onMessageSend={function (type: MessageTypes, content: any): void {
          if (selectedConversation !== null) {
            conversationService.sendMessage(selectedConversation, content).catch((err) => {
              console.log(err);
            });
          }
        }} />


    </Box>
  );
}

export default ModernChatPage;
