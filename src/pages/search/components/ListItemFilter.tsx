import { ListItem, ListItemButton, ListItemText } from '@mui/material'

interface PrivateProps {
    title: string
}

export const ListItemFilter = ({ title }: PrivateProps) => {
    return (
        <ListItem disablePadding
        >
            <ListItemButton dense>
                <ListItemText primary={title}
                    primaryTypographyProps={{
                        fontSize: '17px'
                    }} />
            </ListItemButton>
        </ListItem>
    )
}