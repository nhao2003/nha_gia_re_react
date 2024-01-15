import React, { useEffect, useRef, useState } from 'react';

import { Box, Avatar, Typography, List, ListItemAvatar, ListItemText, Divider, ListItemButton } from '@mui/material';

import ChatContent from './components/ChatContent';
import { MessageTypes } from '../../../../constants/enums';
import AuthService from '../../../../services/auth.service';
import { useNavigate, useParams } from 'react-router-dom';
import conversationService from '../../../../services/conversation.service';
import type Conversation from '../../../../models/interfaces/IConversation';
import type IMessage from '../../../../models/interfaces/IMessage';
import type IParticipant from '../../../../models/interfaces/IParticipant';
import type { IUser } from '../../../../models/interfaces/IUser';

function ModernChatPage() {
  const [messages, setMessages] = useState<Record<string, IMessage[]>>({});
  const [conversations, setConversations] = useState<any>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);

  const userId = AuthService.getInstance().getUserIdFromToken();

  // Get id from url
  const { id } = useParams();
  function conversationListener(conversations: Conversation[]) {
    setConversations(conversations);
  }

  function messageListener(conversationId: string, messages: IMessage[]) {
    setMessages((prev) => {
      return {
        ...prev,
        [conversationId]: messages,
      };
    });
  }

  const initializeSocket = async () => {
    conversationService.addConversationsEventListener(conversationListener);
    conversationService.addMessagesEventListener(messageListener);
    await conversationService.initSocket();
    setConversations(await conversationService.getConversations());
    setMessages(await conversationService.getAllMessages());
  };
  const navigate = useNavigate();
  const [isXs, setIsXs] = useState(window.innerWidth < 600);

  useEffect(() => {
    console.log('useEffect Initialize Chat Page');
    initializeSocket().catch((err) => {
      console.log(err);
      navigate('/signin');
    });

    if (id !== undefined) {
      console.log('Call from useEffect: ', id);
      handleIdChange(id);
    }

    const handleResize = () => {
      setIsXs(window.innerWidth < 600);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      conversationService.removeConversationsEventListener(conversationListener);
      conversationService.removeMessagesEventListener(messageListener);
    };
  }, []);

  function handleIdChange(id: string) {
    conversationService
      .getOrCreateConversation(id)
      .then((data) => {
        if (data !== null && data !== undefined) {
          console.log('Conversation found: ', data);
          setSelectedConversation(data.conversation.id);
          conversationService.initConversation(data.conversation.id);
        } else {
          console.log('Conversation not found');
          setSelectedConversation(null);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        width: '100wh',
        overflowY: 'auto',
        flex: 1,
      }}
    >
      <List
        sx={{
          width: {
            xl: '25%',
            lg: '25%',
            md: '25%',
            sm: '25%',
            xs: '15%',
          },
          overflowY: 'hidden',
          // overflowY: 'auto',
          backgroundColor: '#f5f5f5',
        }}
      >
        {conversations.map((conversation: Conversation) => {
          const otherParticipant: IParticipant = conversation.participants.find(
            (participant: any) => participant.user_id !== userId,
          ) as IParticipant;
          const otherUser: IUser = conversation.users.find(
            (user: IUser) => user.id === otherParticipant.user_id,
          ) as IUser;
          return (
            <React.Fragment key={conversation.id}>
              <ListItemButton
                alignItems='flex-start'
                onClick={() => {
                  // setSelectedConversation(conversation.id);
                  console.log('Selected conversation: ', conversation.id);
                  console.log('Conversations: ', conversations);
                  console.log('Messages: ', messages);
                  /// Set conversation id to url
                  navigate(`/chat/${otherParticipant.user_id}`);
                  handleIdChange(otherParticipant.user_id);
                }}
                sx={{
                  backgroundColor: selectedConversation === conversation.id ? '#e0e0e0' : 'transparent',
                }}
              >
                <ListItemAvatar>
                  <Avatar alt={otherUser.first_name} src={otherUser.avatar ?? ''} />
                </ListItemAvatar>
                {!isXs && (
                  <ListItemText
                    primary={otherUser.first_name}
                    secondary={
                      <React.Fragment>
                        <Typography sx={{ display: 'inline' }} component='span' variant='body2' color='text.primary'>
                          {conversation.last_message === undefined || conversation.last_message === null
                            ? 'Bắt đầu cuộc trò chuyện'
                            : conversation.last_message.type === MessageTypes.text
                              ? conversation.last_message.content.text
                              : 'Đã gửi phương tiện'}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                )}
              </ListItemButton>
              {!isXs && <Divider variant='inset' component='li' />}
            </React.Fragment>
          );
        })}
      </List>
      <ChatContent
        messages={messages[selectedConversation ?? ''] ?? []}
        isNoChatSelected={selectedConversation === null}
        isFetching={messages[selectedConversation ?? ''] === undefined}
        myId={userId ?? ''}
        onMessageSend={async function (content: any): Promise<void> {
          if (selectedConversation !== null) {
            await conversationService.sendMessage(selectedConversation, content);
          }
        }}
      />
    </Box>
  );

}

export default ModernChatPage;
