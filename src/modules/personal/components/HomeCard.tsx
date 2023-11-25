import { Stack, Typography } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import CUSTOM_COLOR from '../../../constants/colors'
import bedroom from '../../../assets/images/bedroom.svg'
import bathroom from '../../../assets/images/bathroom.svg'
import area from '../../../assets/images/area.svg'
import { FacilityTag } from '../../../components/FacilityTag'


interface PrivateProps {
    image: string
    price: any
    title: string
    loved: boolean
    address: string
    bedrooms: number
    bathrooms: number
    areas: number
    sx?: object
}



export const HomeCard = ({ image, price, title, loved, address, bedrooms, bathrooms, areas, sx }: PrivateProps) => {
    return (
        <Stack
            direction={'column'}
            sx={{
                ...sx,
                width: '280px',
                height: 'fit-content',
                borderRadius: '10px',
                border: '2px solid',
                borderColor: CUSTOM_COLOR.grayNobel,
            }}
        >

            <img
                src={image}
                style={{
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px'
                }}
            />

            <Stack direction={'row'}
                sx={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginLeft: '20px',
                    marginRight: '20px',
                    marginTop: '15px'
                }}
            >
                <Typography sx={{
                    color: CUSTOM_COLOR.primary,
                    fontSize: '20px',
                    fontWeight: 'bold'
                }}>{price}</Typography>

                <Stack sx={{
                    border: '2px solid',
                    borderColor: CUSTOM_COLOR.grayNobel,
                    borderRadius: '50px',
                    width: '45px',
                    height: '45px',
                    justifyContent: 'center',
                    alignItems: 'center'

                }}>
                    <FavoriteBorderIcon
                        sx={{
                            height: '35px',
                            width: '35px'
                        }}
                    />

                </Stack>

            </Stack>

            <Stack
                sx={{
                    marginLeft: '20px',
                    marginRight: '20px',
                    marginTop: '10px'
                }}
            >
                <Typography sx={{
                    color: CUSTOM_COLOR.black,
                    fontSize: '22px',
                    fontWeight: 'bold'
                }}>
                    {title}
                </Typography>

            </Stack>

            <Stack
                sx={{
                    marginLeft: '20px',
                    marginRight: '20px',
                    marginTop: '10px'
                }}
            >
                <Typography sx={{
                    color: CUSTOM_COLOR.grayScorpion,
                    fontSize: '20px',

                }}>
                    {address}
                </Typography>

            </Stack>

            <Stack
                sx={{
                    width: '100%',
                    borderBlockEnd: '2px solid',
                    borderColor: CUSTOM_COLOR.grayNobel,
                    marginTop: '10px'
                }}
            >

            </Stack>

            <Stack
                direction={'row'}
                alignItems={'center'}
                justifyContent={'space-evenly'}
                padding={1}
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
                    title={<div><span>m</span><sup style={{ fontSize: '12px' }}>2</sup></div>}
                />

            </Stack>





        </Stack>
    )
}


