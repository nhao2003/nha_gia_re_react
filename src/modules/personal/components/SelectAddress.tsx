import { FormControl, InputLabel, Select, Stack, Typography } from '@mui/material'

interface PrivateProps {
    title: string
    require: boolean
    placeholder: string
}

export const SelectAddress = ({ title, require, placeholder }: PrivateProps) => {
    return (
        <Stack direction={'column'} marginBottom={2}>
            <Stack direction={'row'} >
                <Typography variant='inherit'>{title}</Typography>
                {require ? <Typography variant='inherit' color={'red'}>(*)</Typography> : null}
            </Stack>

            <FormControl sx={{
                marginTop: 2
            }}>
                <InputLabel id="demo-simple-select-helper-label">--{placeholder}--</InputLabel>
                <Select
                    sx={{
                        '& fieldset': {
                            borderRadius: '10px'
                        }
                    }}
                />

            </FormControl>
        </Stack>
    )
}