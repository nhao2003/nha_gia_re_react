import { Box, Button, FormControlLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material'
import { TextFieldTitle } from '../components/TextFieldTitle'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { SelectAddress } from '../components/SelectAddress'
import CUSTOM_COLOR from '../../../constants/colors'


export const PersonalInformationPage = () => {
    return (
        <Box sx={{
            width: '50%', padding: 2,
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            backgroundColor: 'background.default',
        }}>
            <Typography variant='h6' sx={{
                fontWeight: 'bold'
            }}>Thông tin cá nhân</Typography>

            <TextFieldTitle
                title={'Họ và tên'}
                placeholder={'Họ và tên'}
                require={true}
            />

            <Stack direction={'row'} sx={{
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 2

            }}>

                <Stack direction={'row'} sx={{
                    width: '20%'
                }}>
                    <Typography variant='inherit'>Ngày sinh</Typography>

                </Stack>


                <DatePicker sx={{
                    width: '80%',
                    '& fieldset': {
                        borderRadius: '10px'
                    }
                }}
                />
            </Stack>

            <Stack direction={'row'} sx={{
                justifyContent: 'start',
                alignItems: 'center',
                marginTop: 2

            }}>

                <Stack direction={'row'} sx={{
                    width: '20%'
                }}>
                    <Typography variant='inherit'>Giới tính</Typography>

                </Stack>


                <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group"  >
                    <FormControlLabel value="Male" control={<Radio />} label="Nam" />
                    <FormControlLabel value="Female" control={<Radio />} label="Nữ" />
                </RadioGroup>
            </Stack>

            <Stack direction={'row'} sx={{
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 2

            }}>

                <Stack direction={'row'} sx={{
                    width: '20%'
                }}>
                    <Typography variant='inherit'>Địa chỉ</Typography>

                </Stack>

                <Stack direction={'column'} sx={{
                    width: '80%'
                }}>
                    <SelectAddress
                        title={'Tỉnh/Thành phố'}
                        require={true}
                        placeholder={'Tỉnh/Thành phố'}
                    />

                    <SelectAddress
                        title={'Quận/Huyện'}
                        require={true}
                        placeholder={'Quận/Huyện'}
                    />
                    <SelectAddress
                        title={'Phường/Xã'}
                        require={true}
                        placeholder={'Phường/Xã'}
                    />

                    <SelectAddress
                        title={'Địa chỉ cụ thể'}
                        require={true}
                        placeholder={'Số nhà, đường'}
                    />
                </Stack>

            </Stack>

            <TextFieldTitle
                title={'Giới thiệu'}
                placeholder={'Vài dòng giới thiệu về bạn'}
                require={false}
            />

            <Typography variant='h6' sx={{
                fontWeight: 'bold'
            }}>Thông tin liên lạc</Typography>
            <TextFieldTitle
                title={'Số điện thoại'}
                placeholder={''}
                require={true}
            />

            <TextFieldTitle
                title={'Email'}
                placeholder={''}
                require={true}
            />
            <TextFieldTitle
                title={'CCCD/CMND'}
                placeholder={''}
                require={false}
            />

            <TextFieldTitle
                title={'Facebook'}
                placeholder={''}
                require={false}
            />

            <TextFieldTitle
                title={'Zalo'}
                placeholder={''}
                require={false}
            />

            <Stack
            width={'100%'}
            alignItems={'center'}
            marginTop={5}
            marginBottom={5}
            >
            <Button
                        variant='contained'

                        sx={{
                            marginTop: 1,
                            width: 'fit-content',
                            backgroundColor: CUSTOM_COLOR.primary,
                            alignSelf: 'center', 
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}
                    >
                        Lưu thông tin
                    </Button>
            </Stack>

           
        </Box>
    )
}