import { CircularProgress, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import { ModernNewsTag } from './components/modernNewsTag';
import { MordernBlogCard } from './components/modernBlogCard';
import { Box } from '@mui/system';
import DOMPurify from 'dompurify';
import { HtmlContent } from './components/HtmlContent';
import { useLocation } from 'react-router-dom';
import type Blog from '../../../../models/Blog';
import { ApiServiceBuilder } from '../../../../services/api.service';
import React from 'react';
function ModernDetailBlogPage(): JSX.Element {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    // Get state
    const [blog, setBlog] = React.useState<Blog | null>(useLocation().state as Blog | null);
    const id = useLocation().pathname.split('/')[2];
    async function fetchBlog() {
        // Fake delay
        const query = new ApiServiceBuilder().withUrl('/blogs?id[eq]=\'' + id + '\'').build();
        const response = await query.get();
        return (response.data as any);
    }

    React.useEffect(() => {

        if (blog === null)
         fetchBlog().then((response) => {
            console.log(response);
            setBlog(response.result[0]);
        }).catch((error) => {
            console.log(error);
        });

    }, []);

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

    return blog === null ? (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'

        }}>
            <CircularProgress />
        </Box>) :
        (
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
                            <Box
                                style={{
                                    textAlign: 'justify',
                                    maxWidth: '100%', // hoặc giá trị cụ thể theo nhu cầu của bạn
                                    overflow: 'hidden', // hoặc scroll/x/auto nếu bạn muốn điều chỉnh hiển thị
                                }}
                            >
                                {/* <div dangerouslySetInnerHTML={{ __html: blog.content}} /> */}
                                {/* Render html content. Isolate its style */}
                                <HtmlContent html={blog.content} />
                            </Box>

                            <Typography alignSelf={'end'}
                                fontWeight={600}
                            >{blog.author}</Typography>

                            <Typography
                                marginTop={2}
                                fontSize={'20px'}
                                fontWeight={600}
                            >Bài viết khác</Typography>


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

                                {newstags.map((news, index) => (
                                    <ModernNewsTag
                                        key={index}
                                        index={index}
                                        title={news.title}
                                    />
                                ))}

                            </Stack>

                        </Stack>

                    </Stack>

                </Stack>
            </Stack>
        )
}

export default ModernDetailBlogPage
