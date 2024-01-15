import React, { useEffect, useRef, useState } from 'react';
import { Box, Avatar, Typography, List, ListItemAvatar, ListItemText, Divider, ListItemButton } from '@mui/material';

import ChatContent from './components/ChatContent';
import type { MessageTypes } from '../../../../constants/enums';
import AuthService from '../../../../services/auth.service';
import { useNavigate } from 'react-router-dom';

enum SocketEvent {
  Init = 'init',
  New = 'new',
  Update = 'update',
  Delete = 'delete',
}

const host = 'http://localhost:8000/conversations';

function ModernChatPage() {
  const socketRef = useRef<any>();
  const [messages, setMessages] = useState<Record<string, any[]>>({});
  const [conversations, setConversations] = useState<any>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const userId = AuthService.getInstance().getUserIdFromToken();
  const handleSocketEvent = (type: SocketEvent, data: any) => {
    const updatedConversations = [...conversations];
    switch (type) {
      case SocketEvent.Init:
        setConversations(data);
        break;
      case SocketEvent.New:
        updatedConversations.push(data);
        setConversations(updatedConversations);
        break;
      case SocketEvent.Update: {
        const updateIndex = updatedConversations.findIndex((conv) => conv.id === data.id);
        if (updateIndex !== -1) {
          updatedConversations[updateIndex] = data;
          setConversations(updatedConversations);
        }
        break;
      }
      case SocketEvent.Delete: {
        const deleteIndex = updatedConversations.findIndex((conv) => conv.id === data.id);
        if (deleteIndex !== -1) {
          updatedConversations.splice(deleteIndex, 1);
          setConversations(updatedConversations);
        }
        break;
      }
      default:
        break;
    }
  };

  const initializeSocket = async () => {
    const accessToken = await AuthService.getInstance().getAccessToken();
 

    socketRef.current.on('conversations', (data: { type: SocketEvent; data: any }) => {
      handleSocketEvent(data.type, data.data);
    });

    socketRef.current.on('messages', (data: {
      type: SocketEvent;
      data: any;
      conversation_id: string;
    }) => {
      const { type, data: message, conversation_id: conversationId } = data;
      switch (type) {
        case SocketEvent.Init:

          console.log(SocketEvent.Init);
          messages[conversationId] = message;
          setMessages({ ...messages });
          break;

        case SocketEvent.New:
          console.log(SocketEvent.New);
          messages[conversationId].push(message);
          setMessages({ ...messages });
          break;
        case SocketEvent.Update: {
          console.log(SocketEvent.Update);
          const updateIndex = messages[conversationId].findIndex((msg) => msg.id === message.id);
          if (updateIndex !== -1) {
            messages[conversationId][updateIndex] = message;
            setMessages({ ...messages });
          }
        }
          break;
        case SocketEvent.Delete: {
          console.log(SocketEvent.Delete);
          const deleteIndex = messages[conversationId].findIndex((msg) => msg.id === message.id);
          if (deleteIndex !== -1) {
            messages[conversationId].splice(deleteIndex, 1);
            setMessages({ ...messages });
          }
        }
          break;
        default:
          console.log('Default');
          break;
      }
      console.log('Messages', messages);
    });
  };
  const navigate = useNavigate();
  useEffect(() => {
    initializeSocket().catch((err) => {
      console.log(err);
      // Go to login page
      navigate('/signin');
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    const index = Object.keys(messages).findIndex((key) => key === selectedConversation);
    if (index === -1) {
      socketRef.current?.emit('init_chat', {
        conversation_id: selectedConversation,
      });
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
          socketRef.current.emit('send_message', {
            type,
            conversation_id: selectedConversation,
            content,
          });
        }} />


    </Box>
  );
}

export default ModernChatPage;
