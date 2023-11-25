import { Stack, Typography } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import CUSTOM_COLOR from '../../../constants/colors'
import bedroom from '../../../assets/images/bedroom.svg'
import bathroom from '../../../assets/images/bathroom.svg'
import area from '../../../assets/images/area.svg'
import { FacilityTag } from '../../../components/FacilityTag'


interface PrivateProps {
    sx: object
    background: string
    place: string
    news: number
}



export const Area = ({ sx, background, place, news }: PrivateProps) => {
    return (
        <Stack
            direction={'column'}
            sx={{
                ...sx,
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover', // Adjust as needed
                backgroundPosition: 'center', // Adjust as needed
                backgroundRepeat: 'no-repeat', // Adjust as needed
                borderRadius: '10px',

            }}
        >


            <Typography sx={{
                color: CUSTOM_COLOR.white,
                fontSize: '23px',
                fontWeight: '600',
                letterSpacing: '2px'

            }}
                marginTop={2}
                marginLeft={2}
            >{place}</Typography>
            <Typography
                marginLeft={2}
                sx={{
                    color: CUSTOM_COLOR.white,
                    fontSize: '18px',
                    fontWeight: '500',
                    letterSpacing: '1px'

                }}
            >{news} tin đăng</Typography>

        </Stack>
    )
}


