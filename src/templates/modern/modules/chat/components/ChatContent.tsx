import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, CircularProgress, List, ListItem, TextField, IconButton, Button, Avatar, ListItemAvatar, Tooltip } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import type IMessage from '../../../../../models/interfaces/IMessage';
import { MessageTypes } from '../../../../../constants/enums';
import MediaGrid from './MediaGrid';
import emptyMesssage from '../../../assets/illustrations/empty_message.svg';
import { CloseOutlined, CloseRounded } from '@mui/icons-material';
import mediaServices from '../../../../../services/media.services';
import TextMessage from './TextMessage';

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
    const [selectedAttachments, setSelectedAttachments] = useState<File[] | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleSendMessage = async () => {
        if (inputMessage === '' && selectedAttachments === null) {
            return;
        }
        if (inputMessage !== '') {
            props.onMessageSend(MessageTypes.text, inputMessage);
            setInputMessage('');

        }
        if (selectedAttachments !== null) {
            setIsUploading(true);
            const uploadMeidas = [...selectedAttachments]
            setSelectedAttachments(null);
            const result = await mediaServices.uploadFiles(uploadMeidas);
            setIsUploading(false);
            props.onMessageSend(MessageTypes.media, result);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files !== null) {
            console.log(e.target.files);
            const files = Array.from(e.target.files);
            setSelectedAttachments(files);
        } else
            console.log(selectedAttachments);
    };

    const chatContentStyles = {
        id: 'chat-content',
        name: 'chat-content',
        display: 'flex',
        flexDirection: 'column',
        flex: '1',
    };

    const chatListStyles = {
        overflowY: 'auto',
    };

    const inputContainerStyles = {
        display: 'flex',
        alignItems: 'center',
        paddingBottom: '16px',
        paddingRight: '16px',
        paddingLeft: '16px',
    };

    const container = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: '1',
    }
    // Sort messages by created_at in ascending order
    props.messages?.sort((a, b) => {
        return new Date(a.sent_at).getTime() - new Date(b.sent_at).getTime();
    });

    // Group messages by date
    const groupedMessages = props.messages.reduce((groups: any, message) => {
        const date = new Date(message.sent_at).toLocaleDateString('vi-VN');
        if (groups[date] === undefined) {
            groups[date] = [];
        }
        groups[date].push(message);
        return groups;
    }, {});
    return props.isNoChatSelected ?
        <Box sx={container}>
            <img src={emptyMesssage} alt="Chat" style={{ width: '20%' }} />
            <Typography variant="h5" component="h5" sx={{ textAlign: 'center' }}>Chọn một cuộc trò chuyện để bắt đầu</Typography>
        </Box> :
        props.isFetching ?
            <Box sx={container}>
                <CircularProgress />
            </Box> :
            <Box sx={chatContentStyles} >
                <Box sx={chatListStyles}>
                    <List
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            gap: '16px',
                            // overflowY: 'auto',
                        }}
                    >
                        {
                            groupedMessages !== undefined && Object.keys(groupedMessages).map((date) => {
                                return (
                                    <React.Fragment key={date}>
                                        <Typography
                                            sx={{
                                                alignSelf: 'center',
                                                color: '#BDBDBD',
                                                fontSize: '12px',
                                                fontWeight: 'bold',
                                                marginTop: '16px',
                                            }}
                                        >
                                            {date}
                                        </Typography>
                                        {
                                            groupedMessages[date].map((message: any) => {
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
                                                            <Tooltip
                                                                enterDelay={1000}
                                                                title={new Date(message.sent_at).toLocaleString()}
                                                                placement={isMyMessage ? 'bottom-end' : 'bottom-start'}>
                                                                <Box
                                                                    sx={{
                                                                        display: 'flex',
                                                                        flexDirection: 'column',
                                                                        alignItems: isMyMessage ? 'flex-end' : 'flex-start',
                                                                        maxWidth: '70%',
                                                                    }}
                                                                >
                                                                    {message.content_type === MessageTypes.text && (
                                                                        <TextMessage
                                                                            message={message}
                                                                            isMyMessage={isMyMessage}
                                                                        />
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
                                                            </Tooltip>

                                                        </Box>

                                                    </ListItem>
                                                )
                                            })
                                        }
                                    </React.Fragment>
                                )
                            }
                            )
                        }
                    </List>

                </Box>
                {
                    selectedAttachments !== null && (
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            gap: '8px',
                            flexWrap: 'wrap',
                            marginTop: '8px',
                        }}>
                            {selectedAttachments.map((file) => (
                                <Box
                                    key={file.name}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'relative', // Để có thể sử dụng position absolute cho nút
                                        alignItems: 'flex-start',
                                        gap: '8px',
                                        padding: '8px',
                                        borderRadius: '8px',
                                        backgroundColor: '#F3F4F6',
                                        position: 'relative', // Thêm position relative để tạo không gian cho position absolute của nút
                                    }}
                                >

                                    {
                                        // Nếu là file video thì hiển thị thumbnail của video, còn lại thì hiển thị thumbnail của ảnh
                                        file.type.startsWith('video') ?
                                            <video
                                                src={URL.createObjectURL(file)}
                                                style={{ maxHeight: '100px', maxWidth: '100px' }}
                                                controls={false}
                                                autoPlay={false}
                                            /> :
                                            <img
                                                src={URL.createObjectURL(file)}
                                                alt={file.name}
                                                style={{ maxHeight: '100px', maxWidth: '100px' }}
                                            />
                                    }
                                    <IconButton
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                        }}
                                        onClick={() => {
                                            setSelectedAttachments(selectedAttachments.filter((f) => f !== file));
                                        }}
                                    >
                                        <CloseRounded />
                                    </IconButton>
                                </Box>
                            ))}
                        </Box>
                    )
                }

                <Box sx={inputContainerStyles}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Nhập tin nhắn..."
                        value={inputMessage}
                        onChange={(e) => { setInputMessage(e.target.value); }}
                        onKeyDown={
                            (e) => {
                                if (e.key === 'Enter') {
                                    handleSendMessage().catch((err) => {
                                        console.log(err);
                                    });
                                }
                            }
                        }

                    />
                    <input type="file" multiple={true}
                        accept="image/*, video/*" style={{ display: 'none' }}
                        id="fileInput"
                        onClick={(e) => { e.currentTarget.value = ''; }}
                        onChange={handleFileChange} />
                    <label htmlFor="fileInput">
                        <IconButton component="span" color="primary" aria-label="attach file">
                            <AttachFileIcon
                                sx={{
                                    color: '#026D4D',
                                }}
                            />
                        </IconButton>
                    </label>
                    {
                        isUploading ?
                            <CircularProgress sx={{ marginLeft: '8px' }} /> :
                            <Button variant="contained"
                                sx={{
                                    marginLeft: '8px',
                                    backgroundColor: '#026D4D',
                                    color: '#fff',
                                    '&:hover': {
                                        backgroundColor: '#026D4D',
                                        color: '#fff',
                                    },
                                }}
                                onClick={
                                    () => {
                                        handleSendMessage().catch((err) => {
                                            console.log(err);
                                        });
                                    }
                                } >

                                Gửi
                            </Button>
                    }
                </Box>
            </Box>

        ;
};

export default ChatContent;
