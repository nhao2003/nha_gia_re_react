import React, { useEffect, useRef, useState } from 'react';
import { Box, Avatar, Typography, List, ListItem, ListItemAvatar, ListItemText, Divider, Button } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { connect } from 'socket.io-client';
import ChatContent from './components/ChatContent';
import type { MessageTypes } from '../../../../constants/enums';

enum SocketEvent {
  Init = 'init',
  New = 'new',
  Update = 'update',
  Delete = 'delete',
}

const host = 'http://localhost:8000/conversations';
const myId = '1a9a5785-721a-4bb5-beb7-9d752e2070d4';

function ModernChatPage() {
  const socketRef = useRef<any>();
  const [messages, setMessages] = useState<Record<string, any[]>>({});
  const [conversations, setConversations] = useState<any>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const handleSocketEvent = (type: SocketEvent, data: any) => {
    const updatedConversations = [...conversations];
    const updatedMessages = { ...messages };

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

  const initializeSocket = () => {
    socketRef.current = connect(host, {
      auth: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMWE5YTU3ODUtNzIxYS00YmI1LWJlYjctOWQ3NTJlMjA3MGQ0Iiwic2Vzc2lvbl9pZCI6IjUxOTk4NmMwLWEwY2QtNDIzMC1iMWRkLTc1ODkwNmZiYTk5NyIsImlhdCI6MTcwNTA1MDIyMCwiZXhwIjoxNzA3NjQyMjIwfQ.MQPNrJP4mP1WJ5x2FuNV9WLeezSnTcQ2OGf2SGmS4SI',
      },
    });

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

  useEffect(() => {
    initializeSocket();

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    const index = Object.keys(messages).findIndex((key) => key === selectedConversation);
    if (index === -1) {
      socketRef.current.emit('init_chat', {
        conversation_id: selectedConversation,
      });
    }
  }, [selectedConversation]);

  const handleSendMessage = () => {
    console.log(newMessage);
    setNewMessage('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file ?? null);
  };

  useEffect(() => {
    if (listRef.current !== null) {
      console.log('Scroll to bottom');
      listRef.current.scrollTop = listRef.current.scrollHeight;
    } else {
      console.log('List ref is null');
    }
  }, [messages]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '16px', paddingX: '20px', width: '100%', minHeight: '100vh' }}>
      <List sx={{ width: '300px', overflowY: 'auto', maxHeight: '100%' }}>
        {conversations.map((conversation: any) => {
          const otherParticipant: any = conversation.participants.find((participant: any) => participant.user_id !== myId);
          const otherUser: any = conversation.users.find((user: any) => user.id === otherParticipant.user_id);
          return (
            <React.Fragment key={conversation.id}>
              <ListItem
                alignItems="flex-start"
                button
                onClick={() => {
                  setSelectedConversation(conversation.id);
                }}
              >
                <ListItemAvatar>
                  <Avatar alt={otherUser.first_name} src={otherUser.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={otherUser.first_name}
                  secondary={
                    <React.Fragment>
                      <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                        {conversation.last_message.content.text}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          );
        })}
      </List>


      <ChatContent
        messages={messages[selectedConversation ?? ''] ?? []}
        isNoChatSelected={selectedConversation === null}
        isFetching={messages[selectedConversation ?? ''] === undefined}
        myId={'1a9a5785-721a-4bb5-beb7-9d752e2070d4'}
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
