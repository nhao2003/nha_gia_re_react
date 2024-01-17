import { Typography } from "@mui/material";
import type IMessage from '../../../../../models/interfaces/IMessage';


interface TextMessageProps {
    message: IMessage;
    isMyMessage: boolean;
}

export default function TextMessage({ message, isMyMessage }: TextMessageProps) {
    return (
        <Typography
            sx={{
                color: '#000',
                padding: '8px',
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
                whiteSpace: 'pre-wrap',
                backgroundColor: isMyMessage ? '#DAC0A3' : '#F3F4F6',
                borderRadius: '8px',
            }}
            variant="body2"
        >
            {message.content.text}
        </Typography>
    );
}