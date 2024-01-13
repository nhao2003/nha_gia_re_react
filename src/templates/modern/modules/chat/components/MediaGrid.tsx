import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';

interface MediaGridProps {
    medias: string[];
    onMediaTap?: (index: number) => void;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
    position: 'relative',
    '&:hover': {
        cursor: 'pointer',
    },
}));

const MediaGrid: React.FC<MediaGridProps> = ({ medias, onMediaTap }) => {
    let column: number;
    if (medias.length === 1) {
        column = 1;
    } else if (medias.length === 2 || medias.length === 4) {
        column = 2;
    } else {
        column = 3;
    }

    return (
        <Grid container spacing={2}>
            {medias.map((media, index) => (
                <Grid item xs={12 / column} key={media} sx={
                    {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        '&:hover': {
                            cursor: 'pointer',
                        },

                    }
                }>
                    <StyledPaper
                        onClick={onMediaTap !== undefined ? () => { onMediaTap(index); } : undefined}
                    >
                        <img
                            src={media}
                            alt={`Media ${index}`}
                            style={{
                                objectFit: 'cover',
                                maxHeight: '200px',
                                maxWidth: '200px',
                                aspectRatio: '1/1',
                            }}
                        />
                    </StyledPaper>
                </Grid>
            ))}
        </Grid>
    );
};

export default MediaGrid;
