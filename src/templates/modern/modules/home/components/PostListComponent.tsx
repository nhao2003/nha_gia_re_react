import { Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import CUSTOM_COLOR from '../../../../classic/constants/colors';
import EastIcon from '@mui/icons-material/East';
import { PostNewCard } from './PostNewCard';
import type RealEstatePost from '../../../../../models/RealEstatePost';
import './arrowsOnBottomOrTop.css';
import './hideScrollbar.css';
import './globalStyles.css';
import React from 'react';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import usePreventBodyScroll from './usePreventBodyScroll';
import { useNavigate } from 'react-router-dom';

interface PostListComponentProps {
  title: string;
  posts: RealEstatePost[];
  onViewMoreClick: () => void;
}

const PostListComponent = ({ title, posts, onViewMoreClick }: PostListComponentProps) => {
  const { disableScroll, enableScroll } = usePreventBodyScroll();
  const navigate = useNavigate();

  return (
    <Stack
      direction={'column'}
      marginTop={2}
      marginBottom={2}
      sx={{
        display: 'flex',
      }}
    >
      <Stack direction={'row'} marginBottom={1} justifyContent={'space-between'}>
        <Typography
          variant='h6'
          sx={{
            fontWeight: '600',
            fontSize: '24px',
          }}
        >
          {title}
        </Typography>
        <Stack
          direction={'row'}
          spacing={1}
          alignItems={'center'}
          sx={{
            color: CUSTOM_COLOR.primary,
          }}
          onClick={onViewMoreClick} // Attach onClick handler
        >
          <Typography>Xem thêm</Typography>
          <EastIcon />
        </Stack>
      </Stack>

      <div className='posts' style={{ paddingTop: '10px' }}>
        <div onMouseEnter={disableScroll} onMouseLeave={enableScroll}>
          <ScrollMenu onWheel={onWheel}>
            {posts.map((post, index) => (
              <div key={index} style={{ padding: '10px' }}>
                <PostNewCard
                  key={index}
                  itemId={post.id}
                  image={post.images[0]}
                  title={post.title}
                  price={`${post.price}VNĐ/m2`}
                  address={post.address_detail ?? 'Chưa cập nhật'}
                  time='1 ngày trước'
                  sx={{
                    overflow: 'hidden',
                  }}
                  onClick={() => {
                    navigate(`/details/${post.id}`, {
                      state: post,
                    });
                    navigate(0);
                  }}
                />
              </div>
            ))}
          </ScrollMenu>
        </div>
      </div>
    </Stack>
  );
};

export default PostListComponent;

function onWheel(apiObj: any, ev: React.WheelEvent<Element>) {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
}
