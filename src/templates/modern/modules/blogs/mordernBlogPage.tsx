import { CircularProgress, Pagination, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { MordernBlogCard } from './components/modernBlogCard';
import { ModernNewsTag } from './components/modernNewsTag';
import { useNavigate } from 'react-router';
import React from 'react';
import { Box } from '@mui/system';
import { ApiServiceBuilder } from '../../../../services/api.service';
import type Blog from '../../../../models/Blog';

function ModernBlogPage(): JSX.Element {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const navigate = useNavigate();
  const [blogs, setBlogs] = React.useState<{
    numOfPages: number;
    blogs: Blog[];
  }>({ numOfPages: 1, blogs: [] });
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const newstags = [
    {
      title: 'Lãi Suất Vay Ngân Hàng Tháng 10/2023 Mới Nhất',
    },
    {
      title: 'Thị Trường BĐS Vùng Ven Đang Ấm Trở Lại',
    },
    {
      title: 'Căn Hộ Chung Cư Tiếp Tục Dẫn Sóng Thị Trường BĐS',
    },
    {
      title: 'Lãi Suất Vay Ngân Hàng Tháng 10/2023 Mới Nhất',
    },
    {
      title: 'Căn Hộ Chung Cư Tiếp Tục Dẫn Sóng Thị Trường BĐS',
    },
    {
      title: 'Lãi Suất Vay Ngân Hàng Tháng 10/2023 Mới Nhất',
    },
  ];
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get('page') ?? '1';
  async function fetchBlogs() {
    // Fake delay
    const query = new ApiServiceBuilder()
      .withUrl('/blogs')
      .withParams({
        page: page,
      })
      .build();
    const response = await query.get();
    return response.data as any;
  }

  React.useEffect(() => {
    setIsLoading(true);
    fetchBlogs()
      .then((response) => {
        setBlogs({
          numOfPages: response.num_of_pages,
          blogs: response.result,
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page]);

  return isLoading ? (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <Stack width={'100%'} height={'fit-content'} alignItems={'center'} marginTop={'20px'}>
      <Box
        sx={{
          objectFit: 'cover',
          width: '100%',
          maxWidth: '75%',
          flexDirection: 'column',
        }}
      >
        <Typography
          alignSelf={'center'}
          typography={'h4'}
          color={'#026D4D'}
          sx={{
            fontWeight: 'bold',
            margin: '5px',
          }}
        >
          Tin bất động sản mới nhất
        </Typography>

        <Stack direction={'row'}>
          <Box
            width={matches ? '70%' : '100%'}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {blogs.blogs.map((blog, index) => (
              <MordernBlogCard
                key={index}
                id={blog.id}
                title={blog.title}
                author={blog.author}
                thumbnail={blog.thumbnail}
                createdAt={blog.created_at}
                shortDescription={blog.short_description}
                onClick={(id) => {
                  navigate(`/blogs/${id}`, {
                    state: blog,
                  });
                }}
              />
            ))}
            <Pagination
              sx={{
                marginTop: '20px',
                width: '100%',
              }}
              count={blogs.numOfPages}
              variant='outlined'
              shape='rounded'
              defaultPage={parseInt(page)}
              onChange={(event, page) => {
                navigate(`/blogs?page=${page}`);
              }}
            />
          </Box>

          <Stack display={matches ? 'block' : 'none'} width={'30%'} justifyContent={'center'} alignItems={'center'}>
            <Stack
              width={'85%'}
              alignSelf={'center'}
              marginLeft={'20px'}
              sx={{
                borderRadius: '10px',
                border: '1px #ccc solid',
                padding: '5px',
                paddingLeft: '10px',
                paddingRight: '10px',
              }}
            >
              <Typography
                sx={{
                  fontWeight: '600',
                }}
              >
                Bài viết được xem nhiều nhất
              </Typography>

              {newstags.map((news, index) => (
                <ModernNewsTag key={index} index={index} title={news.title} />
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}

export default ModernBlogPage;
