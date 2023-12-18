import { Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import CUSTOM_COLOR from '../../../../classic/constants/colors';
import EastIcon from '@mui/icons-material/East';
import { PostNewCard } from './PostNewCard';
import type RealEstatePost from '../../../../../models/RealEstatePost';
import './arrowsOnBottomOrTop.css';
import './hideScrollbar.css';
import { LeftArrow, RightArrow } from './arrows';
import './globalStyles.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import usePreventBodyScroll from './usePreventBodyScroll';
import { Card } from './card';

interface PostListComponentProps {
  title: string;
  posts: RealEstatePost[];
}

const elemPrefix = 'test';
const getId = (index: number) => `${elemPrefix}${index}`;

const getItems = () =>
  Array(20)
    .fill(0)
    .map((_, ind) => ({ id: getId(ind) }));

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

const PostListComponent = ({ title, posts }: PostListComponentProps) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up(950));
  const endSlice = matches ? 4 : 2;

  const [items] = React.useState(getItems);
  const { disableScroll, enableScroll } = usePreventBodyScroll();

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
        >
          <Typography>Xem thêm</Typography>
          <EastIcon />
        </Stack>
      </Stack>

      {/* <Stack direction={'row'} spacing={2}>
        {posts.map((post, index) => (
          <PostNewCard
            key={index}
            image={post.images[0]}
            title={post.title}
            price={`${post.price}đ/$m2`}
            address={post.address_detail ?? 'Chưa cập nhật'}
            time='1 ngày trước'
            sx={{
              overflow: 'hidden',
            }}
          />
        ))}
      </Stack> */}

      <div className='example' style={{ paddingTop: '100px', height: '150vh' }}>
        <div onMouseEnter={disableScroll} onMouseLeave={enableScroll}>
          <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} onWheel={onWheel}>
            {items.map(({ id }) => (
              <Card
                title={id}
                itemId={id} // NOTE: itemId is required for track items
                key={id}
              />
            ))}
          </ScrollMenu>
        </div>
      </div>
    </Stack>
  );
};

export default PostListComponent;
