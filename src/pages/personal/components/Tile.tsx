import { Stack, Typography } from "@mui/material"

interface PrivateProps {
    title: string
    value: any
}


export const Tile = ({ title, value }: PrivateProps) => {
    return (
        <Stack direction={'row'} marginTop={1}>
            <Typography variant='body2' color={'gray'}>
                {title}
            </Typography>
            <Typography variant='body2' marginLeft={1}>
                {value}
            </Typography>
        </Stack>
    )
}