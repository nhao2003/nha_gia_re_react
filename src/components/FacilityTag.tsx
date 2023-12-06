import { Stack, Typography } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CUSTOM_COLOR from '../constants/colors';

interface PrivateProps {
    icon: any
    value: number
    title: any
}


export const FacilityTag = ({ icon, value, title }: PrivateProps) => {
    return (

        <Stack
            direction={'row'}
            sx={{
                alignItems: 'center'
            }}
        >
            <img src={icon}
                style={{
                    height: '20px',
                    width: '20px',
                    color: CUSTOM_COLOR.primary
                }}
            />

            <Typography sx={styleTyporaphy}>{value}</Typography>
            <Typography sx={styleTyporaphy}>{title}</Typography>
        </Stack>

    )
}

const styleTyporaphy = {
    fontSize: '14px',
    marginLeft: '8px',
}
