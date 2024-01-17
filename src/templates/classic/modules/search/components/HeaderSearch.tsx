import { Box, Breadcrumbs, Button, FormControl, Grid, Icon, IconButton, InputAdornment, InputLabel, Link, MenuItem, OutlinedInput, Pagination, Select, Stack, SvgIcon, Tab, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import CropIcon from '@mui/icons-material/Crop';
import TuneIcon from '@mui/icons-material/Tune';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import React, { useEffect, useState } from 'react';
import { HomeCardHorizontal } from './HomeCardHorizontal';
import CUSTOM_COLOR from '../../../constants/colors';
import addressUtils from '../../../../../utils/addressUtils';

export const HeaderSearch = () => {


    const theme = useTheme();
    const matches1440 = useMediaQuery(theme.breakpoints.up(1400));
    const matches = useMediaQuery(theme.breakpoints.up(950));

    const [searchKeywords, setSearchKeywords] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        console.log("inputValue: ", inputValue);
        const fetchData = async () => {
            try {
                const response = await fetch(`https://gateway.chotot.com/v2/public/search-suggestion/search?keywords=${inputValue}&site_id=3`);
                const data = await response.json();
                console.log(data);
                setSearchKeywords(data.result);
            } catch (error) {
                console.error('Error fetching search suggestions:', error);
            }
        };

        if (inputValue.trim() !== '') {
            fetchData().catch(console.error);
        } else {
            // Reset the suggestions if the input is empty
            setSearchKeywords([]);
        }
    }, [inputValue]);
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

                    width: matches ? '20%' : '80%'
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
                        onChange={(e) => setInputValue(e.target.value)}
                    />      {/* Display search suggestions */}
                    {searchKeywords.length > 0 && (
                        <ul>
                            {searchKeywords.map((keyword, index) => (
                                <li key={index}>{keyword}</li>
                            ))}
                        </ul>
                    )}

                </FormControl>

                <FormControl
                    sx={{
                        display: matches ? 'inherit' : 'none',
                        width: matches1440 ? '15%' : '18%'
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
                        {
                            addressUtils.getProvinces().map((province, index) => {
                                return (
                                    <MenuItem key={index} value={province.name}>{province.name}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>

                <FormControl sx={{
                    display: matches ? 'inherit' : 'none',
                    width: matches1440 ? '15%' : '18%'
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
                    display: matches ? 'inherit' : 'none',
                    width: matches1440 ? '15%' : '18%'
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
                    display: matches ? 'inherit' : 'none',
                    width: matches1440 ? '15%' : '18%'
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
                        width: '8%',
                        display: matches ? matches1440 ? 'inherit' : 'none' : 'none',
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
                        width: '8%',
                        display: matches ? matches1440 ? 'inherit' : 'none' : 'none',
                    }}
                >
                    Đặt lại
                </Button>

            </Stack>




        </Stack>

    )
}