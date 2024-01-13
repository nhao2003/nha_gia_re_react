// ... imports

import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, CircularProgress, List, ListItem, TextField, IconButton, Button, Avatar, ListItemAvatar } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import type IMessage from '../../../../../models/interfaces/IMessage';
import { MessageTypes } from '../../../../../constants/enums';
import MediaGrid from './MediaGrid';

interface ChatContentProps {
    isFetching: boolean;
    isNoChatSelected: boolean;
    messages: IMessage[];
    myId: string;
    onMediaTap?: (index: number) => void;
    onMessageSend: (type: MessageTypes, content: any) => void;
}

const ChatContent: React.FC<ChatContentProps> = (props) => {
    const [inputMessage, setInputMessage] = useState('');
    const [selectedAttachment, setSelectedAttachment] = useState<File | null>(null);
    

    const handleSendMessage = () => {
        if (inputMessage === '' && selectedAttachment === null) {
            return;
        }
        props.onMessageSend(MessageTypes.text, inputMessage);
        setInputMessage('');
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setSelectedAttachment(file ?? null);
    };

    const chatContentStyles = {
        flex: '1',
        overflow: 'hidden',
        padding: '20px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100vh'
    };

    const chatListStyles = {
        flex: '1',
        overflowY: 'auto',
        maxHeight: '90%'
    };

    const inputContainerStyles = {
        display: 'flex',
        alignItems: 'center',
        marginTop: '16px',
        height: '10%'
    };
    return (
        <Box sx={chatContentStyles} >
            <Box sx={chatListStyles}>
                {props.isNoChatSelected ?
                    <Typography variant="h5" component="h5" sx={{ textAlign: 'center' }}>Chọn một cuộc trò chuyện để bắt đầu</Typography> :
                    props.isFetching ?
                        <Box>
                            <CircularProgress />
                        </Box> :
                        <List
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                gap: '16px',
                                overflowY: 'auto',
                                maxHeight: '100%',
                            }}
                        >
                            {props.messages.map((message) => {
                                const isMyMessage = message.sender_id === props.myId;

                                return (
                                    <ListItem
                                        key={message.id}
                                        sx={{
                                            alignSelf: 'flex-start',
                                        }}
                                    >

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: isMyMessage ? 'flex-end' : 'flex-start',
                                                width: '100%'
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: isMyMessage ? 'flex-end' : 'flex-start',
                                                    maxWidth: '70%'
                                                }}
                                            >
                                                {message.content_type === MessageTypes.text && (
                                                    <>
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                justifyContent: isMyMessage ? 'flex-end' : 'flex-start',
                                                                width: '100%'
                                                            }}
                                                        >
                                                            <Typography
                                                                sx={{
                                                                    display: 'inline',
                                                                    backgroundColor: isMyMessage ? '#026D4D' : '#F3F4F6',
                                                                    color: isMyMessage ? '#fff' : '#000',
                                                                    borderRadius: '8px',
                                                                    padding: '8px',
                                                                    maxWidth: '80%',
                                                                    wordWrap: 'break-word'
                                                                }}
                                                                component="span"
                                                                variant="body2"
                                                                color="text.primary"
                                                            >
                                                                {message.content.text}
                                                            </Typography>
                                                        </Box>
                                                        <Typography
                                                            sx={{
                                                                display: 'inline',
                                                                alignSelf: isMyMessage ? 'flex-end' : 'flex-start',
                                                                marginTop: '4px'
                                                            }}
                                                            component="span"
                                                            variant="body2"
                                                            color="text.primary"
                                                        >
                                                            {new Date(message.sent_at).toLocaleString()}
                                                        </Typography>
                                                    </>
                                                )}
                                                {
                                                    message.content_type === MessageTypes.media && (
                                                        <MediaGrid
                                                            medias={message.content.media}
                                                            onMediaTap={(index) => { console.log(`Media ${index} tapped`); }}
                                                        />
                                                    )
                                                }
                                            </Box>

                                        </Box>

                                    </ListItem>
                                )
                            })}
                        </List>
                }
            </Box>
            <Box sx={inputContainerStyles}>
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Nhập tin nhắn..."
                    value={inputMessage}
                    onChange={(e) => { setInputMessage(e.target.value); }}
                />
                <input type="file" accept="image/*, video/*" style={{ display: 'none' }} id="fileInput" onChange={handleFileChange} />
                <label htmlFor="fileInput">
                    <IconButton component="span" color="primary" aria-label="attach file">
                        <AttachFileIcon />
                    </IconButton>
                </label>
                <Button variant="contained" color="primary" onClick={handleSendMessage} sx={{ marginLeft: '8px' }}>
                    Gửi
                </Button>
            </Box>
        </Box>
    );
};

export default ChatContent;
