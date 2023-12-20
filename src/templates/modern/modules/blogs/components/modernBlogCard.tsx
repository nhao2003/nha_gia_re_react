import React from 'react';
import { Card, CardContent, CardMedia, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';

interface PrivateProps {
    id: string;
    thumbnail: string;
    createdAt: Date;
    author: string;
    title: string;
    shortDescription: string;
    onClick?: (id: string) => void;
}

export const MordernBlogCard = ({ id, thumbnail, createdAt, author, title, shortDescription, onClick }: PrivateProps) => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));


    return (
        <Card
            onClick={() => { onClick !== undefined && onClick(id); }}
            sx={{
                width: '100%',
                height: '200px',
                marginTop: '20px',
                display: 'flex',
                flexDirection: 'row',
                borderRadius: '10px',
                backgroundColor: '#F6F6F6',
                boxShadow: 'none',
            }}
        >
            <CardMedia
                component="img"
                height="100%"
                image={thumbnail}
                alt="Blog Thumbnail"
                sx={{
                    borderTopLeftRadius: '10px',
                    borderBottomLeftRadius: '10px',
                    flex: 9,
                }}
            />
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '60%',
                    flex: 11,
                    alignItems: 'flex-start',
                    // Space between
                    justifyContent: 'space-between',
                }}
            >
                <Box>
                    <Typography sx={{
                        height: 'fit-content',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        typography: 'subtitle2',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        fontWeight: 'bold',
                    }}>{title}</Typography>
                    <Typography
                        typography={'subtitle1'}
                        display={matches ? 'block' : 'none'}
                        textAlign={'justify'}
                        overflow={'hidden'}
                        textOverflow={'ellipsis'}
                        color={'#6A6A6A'}
                        sx={{
                            height: 'fit-content',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                        }}
                    >
                        {shortDescription}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                    }}
                >
                    <Typography sx={{ color: 'gray' }}>{new Date(createdAt).toLocaleDateString()}</Typography>
                </Box>
            </CardContent>

        </Card>
    );
};
