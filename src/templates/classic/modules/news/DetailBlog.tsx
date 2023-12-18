import { Box, CircularProgress, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import { NewsTag } from './components/NewsTag';
import { NewsPost } from './components/NewsPost';
import { useLocation, useNavigate } from 'react-router-dom';
import React from 'react';
import type Blog from '../../../../models/Blog';
import { ApiServiceBuilder } from '../../../../services/api.service';
import { HtmlContent } from '../../../modern/modules/blogs/components/HtmlContent';


function DetailBlog(): JSX.Element {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    const navigate = useNavigate();

    const newstags = [
        {
            title: 'Lãi Suất Vay Ngân Hàng Tháng 10/2023 Mới Nhất'
        },
        {
            title: 'Thị Trường BĐS Vùng Ven Đang Ấm Trở Lại'
        },
        {
            title: 'Căn Hộ Chung Cư Tiếp Tục Dẫn Sóng Thị Trường BĐS'
        },
        {
            title: 'Lãi Suất Vay Ngân Hàng Tháng 10/2023 Mới Nhất'
        },
        {
            title: 'Căn Hộ Chung Cư Tiếp Tục Dẫn Sóng Thị Trường BĐS'
        },
        {
            title: 'Lãi Suất Vay Ngân Hàng Tháng 10/2023 Mới Nhất'
        }
    ]

    const [blogs, setBlogs] = React.useState<{
        numOfPages: number;
        blogs: Blog[];
    }>({ numOfPages: 1, blogs: [] });
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get('page') ?? '1';

    async function fetchBlogs() {
        // Fake delay
        const query = new ApiServiceBuilder().withUrl('/blogs').withParams({
            page: page,
        }).build();
        const response = await query.get();
        return (response.data as any);
    }


    const [blog, setBlog] = React.useState<Blog | null>(useLocation().state as Blog | null);
    const id = useLocation().pathname.split('/')[2];
    async function fetchBlog() {
        // Fake delay
        const query = new ApiServiceBuilder().withUrl('/blogs?id[eq]=\'' + id + '\'').build();
        const response = await query.get();
        return (response.data as any);
    }

    React.useEffect(() => {
        fetchBlogs().then((response) => {
            setBlogs({
                numOfPages: response.num_of_pages,
                blogs: response.result,
            });
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
           
        });

        if (blog == null)
            fetchBlog().then((response) => {
                console.log(response);
                setBlog(response.result[0]);
            }).catch((error) => {
                console.log(error);
            });
    }, []);


    return blog === null ? (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'

        }}>
            <CircularProgress />
        </Box>) : (
        <Stack
            width={'100%'}
            height={'fit-content'}
            alignItems={'center'}
            marginTop={'20px'}
            paddingLeft={'10px'}
            paddingRight={'10px'}
        >
            <Stack
                style={{
                    objectFit: 'cover',
                    width: '100%',
                    maxWidth: '1200px',
                    minWidth: '390px',

                }}

                direction={'column'}
            >

                <Typography
                    alignSelf={'start'}
                    sx={{
                        fontSize: '30px',
                        fontWeight: 'bold',
                        margin: '5px'
                    }}

                >{blog.title}</Typography>
                <Stack
                    direction={'row'}
                    marginTop={3}
                >
                    <Stack
                        width={matches ? '70%' : '100%'}



                    >

                        <HtmlContent html={blog.content} />
                        <Typography alignSelf={'end'}
                            fontWeight={600}
                        >{blog.author   }</Typography>

                        <Typography
                            marginTop={2}
                            fontSize={'20px'}
                            fontWeight={600}
                        >Bài viết khác</Typography>

                        {blogs.blogs.map((blog, index) => (
                            <NewsPost
                                key={index}
                                id={blog.id}
                                image={blog.thumbnail}
                                time={blog.created_at}
                                user={blog.author}
                                title={blog.title}
                                content={blog.short_description}
                                onClick={(id) => {
                                    navigate(`/news/${id}`, {
                                        state: blog,
                                    })
                                }}
                            />

                        ))}
                    </Stack>

                    <Stack
                        display={matches ? 'block' : 'none'}
                        width={'30%'}

                        justifyContent={'center'}
                        alignItems={'center'}
                    >

                        <Stack
                            width={'85%'}
                            alignSelf={'center'}
                            marginLeft={'20px'}
                            sx={{
                                borderRadius: '10px',
                                border: '1px #ccc solid',
                                padding: '5px',
                                paddingLeft: '10px',
                                paddingRight: '10px'

                            }}
                        >

                            <Typography
                                sx={{
                                    fontWeight: '600'
                                }}
                            >Bài viết được xem nhiều nhất</Typography>

                            {blogs.blogs.map((blog, index) => (
                                <NewsTag
                                    key={index}
                                  
                                    title={blog.title}
                                />
                            ))}

                        </Stack>

                    </Stack>

                </Stack>

            </Stack>
        </Stack>
    )
}

export default DetailBlog
