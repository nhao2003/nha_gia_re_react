import { Box, Breadcrumbs, Button, FormControl, Grid, Icon, IconButton, InputAdornment, InputLabel, Link, MenuItem, OutlinedInput, Pagination, Select, Stack, SvgIcon, Tab, TextField, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import CropIcon from '@mui/icons-material/Crop';
import TuneIcon from '@mui/icons-material/Tune';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CUSTOM_COLOR from '../../../constants/colors';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import React from 'react';
import { HomeCardHorizontal } from './HomeCardHorizontal';

export const HeaderSearch = () => {



    return (
        <Stack direction={'column'}>
            <Stack
                direction={'row'}
                sx={{
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    height: '80px',
                    boxShadow: '0px 10px 10px -5px rgba(0, 0, 0, 0.5)'
                }}
            >
                <FormControl sx={{

                    width: '20%'
                }}>
                    <OutlinedInput

                        sx={{

                            '& fieldset': {
                                borderRadius: '10px'
                            },
                            height: '45px',

                        }}
                        placeholder={'Từ khóa, đường, quận...'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    edge="end"
                                >
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                    />

                </FormControl>

                <FormControl
                    sx={{

                        width: '15%'
                    }}
                >

                    <Select
                        sx={{
                            borderRadius: '10px',
                            height: '45px'
                        }}
                        defaultValue='Toàn quốc'
                        displayEmpty
                        renderValue={(value) => {
                            console.log(value);
                            return (
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <SvgIcon sx={{
                                        color: CUSTOM_COLOR.black
                                    }}>
                                        <LocationOnIcon />
                                    </SvgIcon>
                                    {value}
                                </Box>
                            );
                        }}
                    >
                        <MenuItem value={'Toàn quốc'}>Toàn Quốc</MenuItem>
                        <MenuItem value={'Hồ Chí Minh'}>Hồ Chí Minh</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{

                    width: '15%'
                }}>

                    <Select
                        sx={{
                            borderRadius: '10px',
                            height: '45px'
                        }}
                        defaultValue='Loại bất động sản'
                        displayEmpty
                        renderValue={(value) => {
                            console.log(value);
                            return (
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <SvgIcon sx={{
                                        color: CUSTOM_COLOR.black
                                    }}>
                                        <HomeWorkIcon />
                                    </SvgIcon>
                                    {value}
                                </Box>
                            );
                        }}
                    >
                        <MenuItem value={'Loại bất động sản'}>Loại bất động sản</MenuItem>

                    </Select>
                </FormControl>


                <FormControl sx={{

                    width: '15%'
                }}>

                    <Select
                        sx={{
                            borderRadius: '10px',
                            height: '45px'
                        }}
                        defaultValue='Giá'
                        displayEmpty
                        renderValue={(value) => {
                            console.log(value);
                            return (
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <SvgIcon sx={{
                                        color: CUSTOM_COLOR.black
                                    }}>
                                        < LocalAtmIcon />
                                    </SvgIcon>
                                    {value}
                                </Box>
                            );
                        }}
                    >
                        <MenuItem value={'Giá'}>Giá</MenuItem>

                    </Select>
                </FormControl>

                <FormControl sx={{

                    width: '15%'
                }}>

                    <Select
                        sx={{
                            borderRadius: '10px',
                            height: '45px'
                        }}
                        defaultValue='Diện tích'
                        displayEmpty
                        renderValue={(value) => {
                            console.log(value);
                            return (
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <SvgIcon sx={{
                                        color: CUSTOM_COLOR.black
                                    }}>
                                        <CropIcon />
                                    </SvgIcon>
                                    {value}
                                </Box>
                            );
                        }}
                    >
                        <MenuItem value={'Diện tích'}>Diện tích</MenuItem>

                    </Select>
                </FormControl>

                <Button variant="outlined" startIcon={<TuneIcon />}
                    sx={{
                        borderRadius: '10px',
                        height: '45px',
                        borderColor: CUSTOM_COLOR.grayNobel,
                        color: CUSTOM_COLOR.black,
                        width: '8%'
                    }}
                >
                    Lọc thêm
                </Button>

                <Button variant="outlined" startIcon={<RestartAltIcon />}
                    sx={{
                        borderRadius: '10px',
                        height: '45px',
                        borderColor: CUSTOM_COLOR.grayNobel,
                        color: CUSTOM_COLOR.black,
                        width: '8%'
                    }}
                >
                    Đặt lại
                </Button>

            </Stack>




        </Stack>

    )
}