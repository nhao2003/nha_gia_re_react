import { FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material'
import addressUtils from '../../../utils/addressUtils'

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

                >
                    {
                        addressUtils.getProvinces().map((e) => {
                            return (<MenuItem value={e.code} key={e.code}>{e.name}</MenuItem>
                            )
                        })
                    }
                </Select>

            </FormControl>
        </Stack>
    )
}