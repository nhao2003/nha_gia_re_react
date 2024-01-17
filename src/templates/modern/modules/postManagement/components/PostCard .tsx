import React from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Box } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface PostCardProps {
    id: string;
    image: string;
    status: 'approved' | 'pending' | 'rejected';
    title: string;
    address: string;
    expiredDate: Date;
    info_message?: string | null;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const PostCard: React.FC<PostCardProps> = (post: PostCardProps) => {

    const getStatusString = (post: PostCardProps) => {
        switch (post.status) {
            case 'approved':
                if (post.expiredDate > new Date())
                    return 'Hiển thị đến ' + post.expiredDate?.toLocaleDateString('vi-VN') 
                else
                    return 'Đã hết hạn từ ' + post.expiredDate?.toLocaleDateString('vi-VN')
            case 'pending':
                return 'Đang chờ duyệt';
            case 'rejected':
                return post.info_message === undefined ? 'Đã bị từ chối' : 'Đã bị từ chối: ' + post.info_message;
            default:
                return 'Đang chờ duyệt';
        }
    };

    const getStatusBackgroundColor = (status: 'approved' | 'pending' | 'rejected') => {
        switch (status) {
            case 'approved':
                if (post.expiredDate > new Date())
                    return '#D1FAE5';
                else
                    return '#FEF3C7';
            case 'pending':
                return '#EDE9FE';
            case 'rejected':
                return '#FEE2E2';
            default:
                return '#FFC107';
        }
    }

    const getStatusColor = (status: 'approved' | 'pending' | 'rejected') => {
        switch (status) {
            case 'approved':
                if (post.expiredDate > new Date())
                    return '#065F46';
                else
                    return '#92400E';
            case 'pending':
                return '#5B21B6';
            case 'rejected':
                return '#991B1B';
            default:
                return '#FFC107';
        }
    }
    return (
        <Card sx={{ display: 'flex', padding: '16px', borderRadius: '20px', height: 'fit-content' }}>
            <Box sx={{
                width: '25%', height: 'fit-content', aspectRatio: '1/1', borderRadius: '10px', marginRight: '16px',
            }}>
                <CardMedia
                    component="img"
                    sx={{ borderRadius: '10px', aspectRatio: '1/1' }}
                    image={post.image}
                    alt="green iguana"
                />
            </Box>
            <CardContent sx={{ flex: '1 0 auto', width: '25%', padding: '0px 0px 0px 0px' }}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography variant="subtitle2" style={{
                        background: getStatusBackgroundColor(post.status),
                        borderRadius: '8px',
                        padding: '4px 8px 4px 8px',
                        marginBottom: '8px',
                        width: 'fit-content',
                        color: getStatusColor(post.status),

                    }}>{getStatusString(post)}</Typography>
                    <IconButton aria-label="more"
                        onClick={post.onClick}
                    >
                        <MoreVertIcon />
                    </IconButton>
  
                </div>
                <Typography variant="h6" gutterBottom sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }} >
                    {post.title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                    {post.address}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default PostCard;
