import { FormControl, Stack, TextField, Typography } from '@mui/material'


interface PrivateProps {
    title: string
    placeholder: string
    require: boolean
}

export const TextFieldTitle = ({ title, placeholder, require }: PrivateProps) => {
    return (
        <Stack direction={'row'} sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 2
        }}>

            <Stack direction={'row'} sx={{
                width: '20%'
            }}>
                <Typography variant='inherit'>{title}</Typography>
                {require ? <Typography variant='inherit' color={'red'}>(*)</Typography> : null}
            </Stack>

            <FormControl sx={{
                width: '80%',
            }}>


                <TextField
                    sx={{

                        '& fieldset': {
                            borderRadius: '10px'
                        }
                    }}
                    placeholder={placeholder}
                />

            </FormControl>


        </Stack>
    )
}