import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

interface PrivateProps {
    index: number
    selected: boolean
    setSelected: React.MouseEventHandler<HTMLDivElement>
    icon: React.ComponentType
    title: string
}

export const SelectedTab = ({ index, selected, setSelected, icon: Icon, title }: PrivateProps) => {
    return (
        <ListItemButton
            selected={selected}
            onClick={setSelected}
            sx={{
                '&.Mui-selected': {
                    backgroundColor: '#D9D9D9',
                    color: '#000'
                },
                '&.Mui-focusVisible': {
                    backgroundColor: '#F5F5F5',
                },
                ':hover': {
                    backgroundColor: '#F5F5F5',
                },
            }}
        >
            <ListItemIcon sx={{
                color: selected ? 'black' : 'gray'
            }}>
                <Icon />
            </ListItemIcon>
            <ListItemText primary={title} sx={{
                color: selected ? 'black' : 'gray'
            }} />
        </ListItemButton>)
}