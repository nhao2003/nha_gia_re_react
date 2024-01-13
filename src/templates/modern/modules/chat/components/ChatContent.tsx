// ... imports

import { Box, Typography, CircularProgress, List, ListItem, TextField, IconButton, Button, Avatar, ListItemAvatar, ListItemText, Grid } from '@mui/material';
import React, { useState } from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import type IMessage from '../../../../../models/interfaces/IMessage';
import { MessageTypes } from '../../../../../constants/enums';


interface ChatContentProps {
    isFetching: boolean;
    isNoChatSelected: boolean;
    messages: IMessage[];
    myId: string;
}

const ChatContent = (props: ChatContentProps) => {
    const [inputMessage, setInputMessage] = useState('');
    const [selectedAttachment, setSelectedAttachment] = useState<File | null>(null);

    const handleSendMessage = () => {
        // Xử lý khi người dùng gửi tin nhắn
        console.log(inputMessage);
        // Cần thêm xử lý thêm tin nhắn vào danh sách messages ở đây.
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
    const renderMediaContent = (media: string[], senderId: string) => {
        const numColumns = media.length === 1 ? 1 : media.length % 2 === 0 ? 4 : 3;

        return (
            <Grid container sx={{ gap: '4px', justifyContent: props.myId === senderId ? 'flex-end' : 'flex-start' }}>
                {media.map((item: string, index: number) => (
                    <Grid item xs={12 / numColumns} key={index} sx={{ padding: '4px' }}>
                        <img src={item} style={{ width: '100%' }} alt={`media-${index}`} />
                    </Grid>
                ))}
            </Grid>
        );
    };
    return (
        <Box sx={chatContentStyles}>
            <Box sx={chatListStyles}>
                {props.isNoChatSelected ?
                    <Typography variant="h5" component="h5" sx={{ textAlign: 'center' }}>Chọn một cuộc trò chuyện để bắt đầu</Typography> :
                    props.isFetching ?
                        <Box>
                            <CircularProgress />
                        </Box> :
                        <List>
                            {props.messages.map((message) => (
                                <ListItem
                                    key={message.id}
                                    sx={{  
                                           
                                    alignSelf: 'flex-start',
                                 }}
                                >
                                    {message.content_type === MessageTypes.text && (
                                        <ListItemText
                                            primary={message.content.text}
                                            secondary={
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    {new Date(message.sent_at).toLocaleString()}
                                                </Typography>
                                            }
                                        />
                                    )}
                                    {message.content_type === MessageTypes.media && renderMediaContent(message.content.media, Math.random() > 0.5 ? props.myId : 'other')}
                                </ListItem>
                            ))}
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
