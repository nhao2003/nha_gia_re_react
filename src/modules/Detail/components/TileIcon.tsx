import { Stack, Typography } from "@mui/material"

interface PrivateProps {
    title: any
    value: any
    unit?: any
    icon: React.ComponentType
}


export const TileIcon = ({ title, value, icon: Icon, unit }: PrivateProps) => {
    return (

        <Stack direction={'row'}
            spacing={1}
        >
            <Icon />
            <Typography

            >{title}: </Typography>
            <Typography>{value} {unit}</Typography>

        </Stack>
    )
}