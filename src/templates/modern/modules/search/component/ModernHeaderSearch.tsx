import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Stack,
  SvgIcon,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import addressUtils from '../../../../../utils/addressUtils';
import CUSTOM_COLOR from '../../../../classic/constants/colors';
import React from 'react';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { useNavigate } from 'react-router-dom';

export const ModernHeaderSearch = () => {
  const theme = useTheme();
  const matches1440 = useMediaQuery(theme.breakpoints.up(1400));
  const matches = useMediaQuery(theme.breakpoints.up(950));

  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('q') ?? ''; // Add this line to get the search term from the URL

  const [search, setSearch] = React.useState(searchTerm ?? '');
  const [open, setOpen] = React.useState(false);

  const provices = addressUtils.getProvinces().map((provice, index) => provice.name);

  const [selectProvince, setSelectProvice] = React.useState(-1);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let params ;

  const handleSearch = () => {      
    searchParams.set('province', selectProvince.toString())
    searchParams.set('q', encodeURIComponent(search).toString());

    console.log(selectProvince)
  
    navigate(`/search?${searchParams.toString()}`, { replace: true });

  };

  const options = [
    'Chung cư',
    'Căn hộ'
  ]
  const [value, setValue] = React.useState<string | null>(options[0]);
  const [inputValue, setInputValue] = React.useState('');



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
            defaultValue={searchTerm}
            placeholder={'Từ khóa, nhà 3 tầng, nhà trọ...'}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton edge='end' onClick={() => handleSearch()}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>


        <Fab sx={{
          marginLeft:'10px'
        }} onClick={handleClickOpen}>
          <FilterAltOutlinedIcon></FilterAltOutlinedIcon>
        </Fab>

        <Dialog
       fullWidth={true}
       maxWidth={'sm'}
        open={open}
        onClose={handleClose}
      >


        <DialogContent>
          <Stack spacing={2}>

          <Select
            onChange={  (e) => {
              setSelectProvice(provices.indexOf(e.target.value))

            }}
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
        
        <Autocomplete
        
          options={options}
     
          renderInput={(params) => <TextField {...params} label="Danh mục" />}
        />
       <Stack>
       <Stack direction={'row'} justifyContent={'space-between'}>
            <Stack direction={'row'}spacing={1} sx ={{
              padding: 1
            }}>
              <Typography>Giá từ</Typography>
              <Typography sx={{
                color: '#1E7B5F'
              }}>0đ</Typography>
              <Typography>đến</Typography>
              <Typography sx={{
                color: '#1E7B5F'
              }}>30.000.000.000đ</Typography>
            </Stack>
              <Stack sx={{
                backgroundColor: '#EDEDEE',
                padding: 1,
                borderRadius: 3
              }}>
                <Typography>120.000.000.000đ</Typography>
              </Stack>
        </Stack>

        <Slider
        size='medium'
        defaultValue={70}
        aria-label="Small"
        valueLabelDisplay="auto"
        sx={{
          color: '#1E7B5F'
        }}
      />
       <Stack direction={'row'} justifyContent={'space-between'}>
            <Stack direction={'row'}spacing={1} sx ={{
              padding: 1
            }}>
              <Typography>Diện tích từ</Typography>
              <Typography sx={{
                color: '#1E7B5F'
              }}>0m2</Typography>
              <Typography>đến</Typography>
              <Typography sx={{
                color: '#1E7B5F'
              }}>10.000m2</Typography>
            </Stack>
              <Stack sx={{
                backgroundColor: '#EDEDEE',
                padding: 1,
                borderRadius: 3
              }}>
                <Typography>120.000.000.000đ</Typography>
              </Stack>
        </Stack>

        <Slider
        size='medium'
        defaultValue={70}
        aria-label="Small"
        valueLabelDisplay="auto"
        sx={{
          color: '#1E7B5F'
        }}
      />
       </Stack>

       <Typography sx={{
        fontWeight: 'bold'
       }}>Đặc điểm bất động sản</Typography>
       <Autocomplete
           
          options={options}
     
          renderInput={(params) => <TextField {...params} label="Tình trạng" />}
        />
        <Autocomplete
          
          options={options}
     
          renderInput={(params) => <TextField {...params} label="Loại hình căn hộ" />}
        />
        <Autocomplete
           
          options={options}
     
          renderInput={(params) => <TextField {...params} label="Đặc điểm căn hộ" />}
        />
        <Autocomplete
          
          options={options}
     
          renderInput={(params) => <TextField {...params} label="Số phòng ngủ" />}
        />
        <Autocomplete
           
          options={options}
     
          renderInput={(params) => <TextField {...params} label="Hướng cửa chính" />}
        />

<Autocomplete
      
          options={options}
     
          renderInput={(params) => <TextField {...params} label="Giấy tờ pháp lý" />}
        />
        <Autocomplete
          
          options={options}
     
          renderInput={(params) => <TextField {...params} label="Tình trạng nội thất" />}
        />

<Stack>

      
      <Typography sx={{
        fontWeight: 'bold'
       }}>Sắp xếp theo</Typography>

       <Stack>
       <RadioGroup
        
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel  sx={{
          justifyContent: 'space-between',
         
        }} labelPlacement="start" value="new" control={<Radio />} label="Tin mới trước" />
        <FormControlLabel sx={{
          justifyContent: 'space-between'
        }}    labelPlacement="start"value="price" control={<Radio />} label="Giá thấp trước" />
        <FormControlLabel sx={{
          justifyContent: 'space-between'
        }}    labelPlacement="start"value="other" control={<Radio />} label="Gần đây nhất" />
        
      </RadioGroup>

      </Stack>
       </Stack>

       <Stack>

      
      <Typography sx={{
        fontWeight: 'bold'
       }}>Đăng bởi</Typography>

       <Stack>
       <RadioGroup
        
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel  sx={{
          justifyContent: 'space-between',
         
        }} labelPlacement="start"  value="canhan"  control={<Radio />} label="Cá nhân" />
        <FormControlLabel sx={{
          justifyContent: 'space-between'
        }}    labelPlacement="start" value="mogioi"  control={<Radio />} label="Môi giới" />

        
      </RadioGroup>

      </Stack>
       </Stack>

       <Stack direction={'row'}
        justifyContent={'end'}
        spacing={1}
       >

        <Button variant="text" sx={{
          color:  '#1E7B5F'
        }}>Đặt lại</Button> 

<Button variant="contained" sx={{
          backgroundColor:  '#1E7B5F'
        }}
        onClick={() =>{
          handleSearch();
          handleClose();
        }}
        >Áp dụng</Button> 


       </Stack>
</Stack>
       
      
        </DialogContent>
      </Dialog>
      </Stack>
    </Stack>
  );
};
