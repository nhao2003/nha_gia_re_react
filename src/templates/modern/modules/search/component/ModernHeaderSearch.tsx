import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  SvgIcon,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import CropIcon from '@mui/icons-material/Crop';
import TuneIcon from '@mui/icons-material/Tune';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import addressUtils from '../../../../../utils/addressUtils';
import CUSTOM_COLOR from '../../../../classic/constants/colors';
import React from 'react';

export const ModernHeaderSearch = () => {
  const theme = useTheme();
  const matches1440 = useMediaQuery(theme.breakpoints.up(1400));
  const matches = useMediaQuery(theme.breakpoints.up(950));

  const [search, setSearch] = React.useState('');

  const handleSearch = () => {
    console.log(search);
  };

  return (
    <Stack direction={'column'}>
      <Stack
        direction={'row'}
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          height: '80px',
          boxShadow: '0px 10px 10px -5px rgba(0, 0, 0, 0.5)',
        }}
      >
        <FormControl
          sx={{
            width: matches ? '50%' : '80%',
            marginRight: '10px',
          }}
        >
          <OutlinedInput
            sx={{
              '& fieldset': {
                borderRadius: '10px',
              },
              height: '45px',
            }}
            placeholder={'Từ khóa, nhà 3 tầng, nhà trọ...'}
            onChange={(e) => setSearch(e.target.value)}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton edge='end' onClick={() => handleSearch()}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControl
          sx={{
            display: matches ? 'inherit' : 'none',
            width: matches1440 ? '15%' : '18%',
          }}
        >
          <Select
            sx={{
              borderRadius: '10px',
              height: '45px',
            }}
            defaultValue='Toàn quốc'
            displayEmpty
            renderValue={(value) => {
              return (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <SvgIcon
                    sx={{
                      color: CUSTOM_COLOR.black,
                    }}
                  >
                    <LocationOnIcon />
                  </SvgIcon>
                  {value}
                </Box>
              );
            }}
          >
            <MenuItem value={'Toàn quốc'}>Toàn Quốc</MenuItem>
            {addressUtils.getProvinces().map((province, index) => {
              return (
                <MenuItem key={index} value={province.name}>
                  {province.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Stack>
    </Stack>
  );
};
