import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material"
import CUSTOM_COLOR from "../../../constants/colors"

interface PrivateProps {
    image: string
    time: any,
    user: string,
    title: string,
    content: string
}



export const NewsPost = ({ image, time, user, title, content }: PrivateProps) => {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));




    return (
        <Stack
            direction={'row'}
            sx={{
                width: '100%',
                height: '200px',
                paddingBottom: '20px',
                borderBottom: '1px #ccc solid',
                marginTop: '20px'
            }}
            spacing={2}

        >
            <img
                src={image}
                style={{
                    width: '40%',
                    borderRadius: '10px'
                }}
            />

            <Stack
                direction={'column'}
            >
                <Stack
                    direction={matches ? 'row' : 'column'}
                    spacing={matches ? 1 : 0}
                >

                    <Typography sx={{
                        color: CUSTOM_COLOR.grayScorpion
                    }}>{time}</Typography>
                    <Typography sx={{
                        color: CUSTOM_COLOR.grayScorpion
                    }}>{user}</Typography>

                </Stack>

                <Typography
                    sx={{
                        fontSize: '18px',
                        fontWeight: '550'
                    }}
                >
                    {title}
                </Typography>

                <Typography
                    display={matches ? 'block' : 'none'}
                    textAlign={'justify'}
                    overflow={'hidden'}
                    textOverflow={'ellipsis'}
                >
                    {content}
                </Typography>
            </Stack>

            <Stack

            >

            </Stack>

        </Stack>

    )
}


