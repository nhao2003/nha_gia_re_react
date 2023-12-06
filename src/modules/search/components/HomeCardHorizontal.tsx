import { Avatar, Divider, Pagination, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import CUSTOM_COLOR from '../../../constants/colors'
import { FacilityTag } from '../../../components/FacilityTag'
import bedroom from '../../../assets/images/bedroom.svg'
import bathroom from '../../../assets/images/bathroom.svg'
import area from '../../../assets/images/area.svg'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


interface PrivateProps {
    image: string
    price: any
    title: string
    loved: boolean
    address: string
    bedrooms: number
    bathrooms: number
    areas: number
    type: string
    avatar: string
    name: string
    time: any
}




export const HomeCardHorizontal = (props: PrivateProps) => {

    const { image, price, title, loved, address, bedrooms, bathrooms, areas, type, avatar, name, time } = props

    const theme = useTheme();
    const matches1440 = useMediaQuery(theme.breakpoints.up(1400));
    const matches = useMediaQuery(theme.breakpoints.up(700));



    return (
        <Stack direction={'row'}
            sx={{
                boxShadow: '2px 2px 5px 0px rgba(0, 0, 0, 0.5)',
                padding: '10px',
                borderRadius: '10px'
            }}
        >

            <img
                src={image}
                style={{
                    borderRadius: '10px',
                    width: '150px',
                    height: '150px',
                    objectFit: 'cover'
                }}

            />

            <Stack direction={'column'} sx={{
                marginLeft: '15px',
                justifyContent: 'space-between',
                padding: '2px',
                width: '100%'
            }}>
                <Typography sx={{
                    color: CUSTOM_COLOR.black,
                    fontSize: '20px',
                    fontWeight: 'bold'
                }}>
                    {title}
                </Typography>

                <Typography sx={{
                    color: CUSTOM_COLOR.grayScorpion,
                    fontSize: '18px',

                }}>
                    {address}
                </Typography>

                <Typography sx={{
                    color: CUSTOM_COLOR.primary,
                    fontSize: '18px',
                    fontWeight: 'bold'
                }}>{price}</Typography>

                <Stack
                    direction={'row'}
                    alignItems={'start'}
                    justifyContent={'start'}

                    spacing={2}
                >

                    <FacilityTag
                        icon={bedroom}
                        value={bedrooms}
                        title={'PN'}
                    />

                    <FacilityTag
                        icon={bathroom}
                        value={bathrooms}
                        title={'WC'}
                    />

                    <FacilityTag
                        icon={area}
                        value={areas}
                        title={<div><span>m</span><sup style={{ fontSize: '8px' }}>2</sup></div>}
                    />

                </Stack>

                <Stack direction={'row'}
                    justifyContent={'space-between'}
                    alignItems={'center'}

                    sx={{
                        display: matches ? 'inherit' : 'none'
                    }}
                >
                    <Stack direction={'row'} spacing={2} alignItems={'center'}>
                        {type === 'agency' ? <BusinessCenterIcon /> : <Avatar alt='Travis Howard' src={avatar} />}
                        {type === 'agency' ? <Typography>Môi giới</Typography> : <Typography>{name}</Typography>}
                        <Divider orientation="vertical" variant="middle" flexItem />
                        <Typography>{time}</Typography>
                    </Stack>

                    {loved ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </Stack>


            </Stack>

        </Stack>
    )
}