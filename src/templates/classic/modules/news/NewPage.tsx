import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material"
import { NewsPost } from "./components/NewsPost"
import { NewsTag } from "./components/NewsTag";


function NewsPage(): JSX.Element {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));


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

    return (
        <Stack
            width={'100%'}
            height={'fit-content'}
            alignItems={'center'}
            marginTop={'20px'}
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
                    alignSelf={'center'}
                    sx={{
                        fontSize: '25px',
                        fontWeight: 'bold',
                        margin: '5px'
                    }}
                >Tin bất động sản mới nhất</Typography>

                <Stack
                    direction={'row'}
                >
                    <Stack
                        width={matches ? '70%' : '100%'}


                    >

                        <NewsPost
                            image='https://cdnphoto.dantri.com.vn/YsHcZ_WkF1-lKr-en4mX_9dYKm8=/2021/04/30/dji-0788-hdr-panoa-crop-1619717280597.jpeg'
                            time='30/07/2023 17:15'
                            user='Nguyễn Văn A'
                            title=' Đất Nền Giá Rẻ Tăng Giá Và Tăng Thanh Khoản Trong Quý 3/2023'
                            content='Đất nền vốn “chịu” tiếng là nặng tính đầu cơ cũng là loại hình chịu tác động mạnh nhất kể từ khi thị trường lao dốc. Tuy nhiên, cùng với những tín hiệu khởi sắc của thị trường thời gian qua, phân khúc đất nền giá ở Đất nền vốn “chịu” tiếng là nặng tính đầu cơ cũng là loại hình chịu tác động mạnh nhất kể từ khi thị trường lao dốc. Tuy nhiên, cùng với những tín hiệu khởi sắc của thị trường thời gian qua, phân khúc đất nền giá rẻ ở'

                        />
                        <NewsPost
                            image='https://cdnphoto.dantri.com.vn/YsHcZ_WkF1-lKr-en4mX_9dYKm8=/2021/04/30/dji-0788-hdr-panoa-crop-1619717280597.jpeg'
                            time='30/07/2023 17:15'
                            user='Nguyễn Văn A'
                            title=' Đất Nền Giá Rẻ Tăng Giá Và Tăng Thanh Khoản Trong Quý 3/2023'
                            content='Đất nền vốn “chịu” tiếng là nặng tính đầu cơ cũng là loại hình chịu tác động mạnh nhất kể từ khi thị trường lao dốc. Tuy nhiên, cùng với những tín hiệu khởi sắc của thị trường thời gian qua, phân khúc đất nền giá ở Đất nền vốn “chịu” tiếng là nặng tính đầu cơ cũng là loại hình chịu tác động mạnh nhất kể từ khi thị trường lao dốc. Tuy nhiên, cùng với những tín hiệu khởi sắc của thị trường thời gian qua, phân khúc đất nền giá rẻ ở'

                        />
                        <NewsPost
                            image='https://cdnphoto.dantri.com.vn/YsHcZ_WkF1-lKr-en4mX_9dYKm8=/2021/04/30/dji-0788-hdr-panoa-crop-1619717280597.jpeg'
                            time='30/07/2023 17:15'
                            user='Nguyễn Văn A'
                            title=' Đất Nền Giá Rẻ Tăng Giá Và Tăng Thanh Khoản Trong Quý 3/2023'
                            content='Đất nền vốn “chịu” tiếng là nặng tính đầu cơ cũng là loại hình chịu tác động mạnh nhất kể từ khi thị trường lao dốc. Tuy nhiên, cùng với những tín hiệu khởi sắc của thị trường thời gian qua, phân khúc đất nền giá ở Đất nền vốn “chịu” tiếng là nặng tính đầu cơ cũng là loại hình chịu tác động mạnh nhất kể từ khi thị trường lao dốc. Tuy nhiên, cùng với những tín hiệu khởi sắc của thị trường thời gian qua, phân khúc đất nền giá rẻ ở'

                        />
                        <NewsPost
                            image='https://cdnphoto.dantri.com.vn/YsHcZ_WkF1-lKr-en4mX_9dYKm8=/2021/04/30/dji-0788-hdr-panoa-crop-1619717280597.jpeg'
                            time='30/07/2023 17:15'
                            user='Nguyễn Văn A'
                            title=' Đất Nền Giá Rẻ Tăng Giá Và Tăng Thanh Khoản Trong Quý 3/2023'
                            content='Đất nền vốn “chịu” tiếng là nặng tính đầu cơ cũng là loại hình chịu tác động mạnh nhất kể từ khi thị trường lao dốc. Tuy nhiên, cùng với những tín hiệu khởi sắc của thị trường thời gian qua, phân khúc đất nền giá ở Đất nền vốn “chịu” tiếng là nặng tính đầu cơ cũng là loại hình chịu tác động mạnh nhất kể từ khi thị trường lao dốc. Tuy nhiên, cùng với những tín hiệu khởi sắc của thị trường thời gian qua, phân khúc đất nền giá rẻ ở'

                        />

                        <NewsPost
                            image='https://cdnphoto.dantri.com.vn/YsHcZ_WkF1-lKr-en4mX_9dYKm8=/2021/04/30/dji-0788-hdr-panoa-crop-1619717280597.jpeg'
                            time='30/07/2023 17:15'
                            user='Nguyễn Văn A'
                            title=' Đất Nền Giá Rẻ Tăng Giá Và Tăng Thanh Khoản Trong Quý 3/2023'
                            content='Đất nền vốn “chịu” tiếng là nặng tính đầu cơ cũng là loại hình chịu tác động mạnh nhất kể từ khi thị trường lao dốc. Tuy nhiên, cùng với những tín hiệu khởi sắc của thị trường thời gian qua, phân khúc đất nền giá ở Đất nền vốn “chịu” tiếng là nặng tính đầu cơ cũng là loại hình chịu tác động mạnh nhất kể từ khi thị trường lao dốc. Tuy nhiên, cùng với những tín hiệu khởi sắc của thị trường thời gian qua, phân khúc đất nền giá rẻ ở'

                        />
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
                                <NewsTag
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

export default NewsPage
