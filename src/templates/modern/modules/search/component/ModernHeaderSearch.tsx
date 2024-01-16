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
  InputLabel,
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
import React, { useEffect } from 'react';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { useNavigate } from 'react-router-dom';

interface HeaderSearchProps {
  onFilterButtonClick: (params: Record<string, any>) => void;
}

export const ModernHeaderSearch = (props: HeaderSearchProps) => {
  const theme = useTheme();
  const matches1440 = useMediaQuery(theme.breakpoints.up(1400));
  const matches = useMediaQuery(theme.breakpoints.up(950));

  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('q') ?? ''; // Add this line to get the search term from the URL

  const [search, setSearch] = React.useState<string | null>(null);
  const [open, setOpen] = React.useState(false);

  const provices = addressUtils.getProvinces().map((provice, index) => provice.name);

  const [selectProvince, setSelectProvince] = React.useState<string | null>(null);
  const [selectType, setSelectType] = React.useState<string | null>(null);

  const [sortBy, setSortBy] = React.useState<string | null>(null);
  const [postBy, setPostBy] = React.useState<string | null>(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [params, setParams] = React.useState({});

  const handleSearch = () => {
    if (search !== null) {
      setParams((params) => ({ ...params, search: encodeURIComponent(search).toString() }));
    }

    if (selectType !== null) {
      setParams((params) => ({ ...params, type_id: selectType }));
    }

    if (selectProvince !== null) {
      setParams((params) => ({ ...params, province_code: selectProvince }));
    }

    if (price[0] > 0 || price[1] < 120000000000) {
      setParams((params) => ({ ...params, minPrice: price[0], maxPrice: price[1] }));
    }

    if (area[0] > 0 || price[1] < 10000) {
      setParams((params) => ({ ...params, minArea: area[0], maxArea: area[1] }));
    }

    if (sortBy !== null) {
      setParams((params) => ({ ...params, sortBy: sortBy }));
    }

    if (postBy != null) {
      setParams((params) => ({ ...params, postBy: postBy }));
    }

    console.log('province', selectProvince, selectType);

    // navigate(`/search?${searchParams.toString()}`, { replace: true });
    props.onFilterButtonClick(params);
  };

  const handCancle = () => {
    setSelectProvince(null);
    setSelectType(null);
    setPrice([0, 120000000000]);
    setArea([0, 10000]);
    setSortBy(null);
    setPostBy(null);
  };
  const options = ['Chung cư', 'Căn hộ'];
  const types = [
    {
      title: 'Nhà trọ',
      value: 'motel',
    },
    {
      title: 'Căn hộ',
      value: 'apartment',
    },
    {
      title: 'Nhà ở',
      value: 'home',
    },
    {
      title: 'Đất',
      value: 'land',
    },
    {
      title: 'Văn phòng',
      value: 'office',
    },
  ];

  const [value, setValue] = React.useState<string | null>(types[0].value);
  const [inputValue, setInputValue] = React.useState('');

  const minDistancePrice = 1000000000;
  const [price, setPrice] = React.useState<number[]>([0, 120000000000]);

  const minDistanceArea = 1000;
  const [area, setArea] = React.useState<number[]>([0, 10000]);

  const handleChangePrice = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistancePrice) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 120000000000 - minDistancePrice);
        setPrice([clamped, clamped + minDistancePrice]);
      } else {
        const clamped = Math.max(newValue[1], minDistancePrice);
        setPrice([clamped - minDistancePrice, clamped]);
      }
    } else {
      setPrice(newValue);
    }
  };

  const handleChangeArea = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistanceArea) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 10000 - minDistanceArea);
        setArea([clamped, clamped + minDistanceArea]);
      } else {
        const clamped = Math.max(newValue[1], minDistancePrice);
        setArea([clamped - minDistanceArea, clamped]);
      }
    } else {
      setArea(newValue);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [selectProvince, selectType, price, area, sortBy, postBy]);

  const numberFormat = new Intl.NumberFormat('en-US');

  return (
    <Stack direction={'column'}>
      <Stack
        direction={'row'}
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          height: '80px',
        }}
      >
        <FormControl
          sx={{
            width: matches ? '70%' : '70%',
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

        <Fab
          sx={{
            marginLeft: '10px',
          }}
          onClick={handleClickOpen}
        >
          <FilterAltOutlinedIcon></FilterAltOutlinedIcon>
        </Fab>

        <Dialog fullWidth={true} maxWidth={'sm'} open={open} onClose={handleClose}>
          <DialogContent>
            <Stack spacing={2}>
              <FormControl>
                <InputLabel>Tỉnh thành</InputLabel>
                <Select
                  onChange={(e) => {
                    setSelectProvince(e.target.value);
                  }}
                  value={selectProvince}
                  label='Tỉnh thành'
                >
                  {addressUtils.getProvinces().map((province, index) => {
                    return (
                      <MenuItem key={index} value={province.code}>
                        {province.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <FormControl>
                <InputLabel>Danh mục</InputLabel>
                <Select
                  value={selectType}
                  defaultValue={null}
                  onChange={(e) => {
                    setSelectType(e.target.value);
                  }}
                  label='Danh mục'
                >
                  {types.map((type, index) => {
                    return (
                      <MenuItem key={index} value={type.value}>
                        {type.title}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <Stack>
                <Stack direction={'row'} justifyContent={'space-between'}>
                  <Stack
                    direction={'row'}
                    spacing={1}
                    sx={{
                      padding: 1,
                    }}
                  >
                    <Typography>Giá từ</Typography>
                    <Typography
                      sx={{
                        color: '#1E7B5F',
                      }}
                    >
                      {numberFormat.format(price[0])}đ
                    </Typography>
                    <Typography>đến</Typography>
                    <Typography
                      sx={{
                        color: '#1E7B5F',
                      }}
                    >
                      {numberFormat.format(price[1])}đ
                    </Typography>
                  </Stack>
                  <Stack
                    sx={{
                      backgroundColor: '#EDEDEE',
                      padding: 1,
                      borderRadius: 3,
                    }}
                  >
                    <Typography>120.000.000.000đ</Typography>
                  </Stack>
                </Stack>

                <Slider
                  getAriaLabel={() => 'Minimum distance shift'}
                  value={price}
                  onChange={handleChangePrice}
                  valueLabelDisplay='auto'
                  min={0}
                  max={120000000000}
                  step={100000000}
                  disableSwap
                  sx={{
                    color: '#1E7B5F',
                  }}
                />
                <Stack direction={'row'} justifyContent={'space-between'}>
                  <Stack
                    direction={'row'}
                    spacing={1}
                    sx={{
                      padding: 1,
                    }}
                  >
                    <Typography>Diện tích từ</Typography>
                    <Typography
                      sx={{
                        color: '#1E7B5F',
                      }}
                    >
                      {area[0]} m<sup>2</sup>
                    </Typography>
                    <Typography>đến</Typography>
                    <Typography
                      sx={{
                        color: '#1E7B5F',
                      }}
                    >
                      {area[1]} m<sup>2</sup>
                    </Typography>
                  </Stack>
                  <Stack
                    sx={{
                      backgroundColor: '#EDEDEE',
                      padding: 1,
                      borderRadius: 3,
                    }}
                  >
                    <Typography>
                      10.000 m<sup>2</sup>
                    </Typography>
                  </Stack>
                </Stack>

                <Slider
                  getAriaLabel={() => 'Minimum distance shift'}
                  value={area}
                  onChange={handleChangeArea}
                  valueLabelDisplay='auto'
                  min={0}
                  max={10000}
                  step={100}
                  disableSwap
                  sx={{
                    color: '#1E7B5F',
                  }}
                />
              </Stack>

              {/* <Typography
                sx={{
                  fontWeight: 'bold',
                }}
              >
                Đặc điểm bất động sản
              </Typography> */}
              {/* <FormControl>
                <InputLabel>Trình trạng</InputLabel>
                <Select
                  value={selectHandOver}
                  onChange={(e) => {
                    setSelectHandOver(e.target.value);
                  }}
                  label='Trình trạng'
                >
                  {handOvers.map((handOver, index) => {
                    return (
                      <MenuItem key={index} value={handOver.value}>
                        {handOver.title}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel>Loại hình căn hộ</InputLabel>
                <Select
                  value={selectTypeDepartment}
                  onChange={(e) => {
                    setSelectTypeDepartment(e.target.value);
                  }}
                  label='Loại hình ăn hộ'
                >
                  {typeApartments.map((typeApartment, index) => {
                    return (
                      <MenuItem key={index} value={typeApartment.value}>
                        {typeApartment.title}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel>Số phòng ngủ</InputLabel>
                <Select
                  value={selectNumBeds}
                  onChange={(e: any) => {
                    setSelectNumBeds(e.target.value);
                  }}
                  label='Số phòng ngủ'
                >
                  {numBeds.map((numBed, index) => {
                    return (
                      <MenuItem key={index} value={numBed.value}>
                        {numBed.title}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel>Hướng cửa chính</InputLabel>
                <Select
                  value={selectDerection}
                  onChange={(e: any) => {
                    setSelectNumBeds(e.target.value);
                  }}
                  label='Hướng cửa chính'
                >
                  {derections.map((derection, index) => {
                    return (
                      <MenuItem key={index} value={derection.value}>
                        {derection.title}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel>Hướng ban công</InputLabel>
                <Select
                  value={selectBalcony}
                  onChange={(e: any) => {
                    setSelectBalcony(e.target.value);
                  }}
                  label='Hướng cửa chính'
                >
                  {derections.map((derection, index) => {
                    return (
                      <MenuItem key={index} value={derection.value}>
                        {derection.title}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel>Giấy tờ pháp lý</InputLabel>
                <Select
                  value={selectLegalDocumentStatus}
                  onChange={(e: any) => {
                    setSelectLegalDocumentStatus(e.target.value);
                  }}
                  label='Giấy tờ pháp lý'
                >
                  {legelDocumentStatuss.map((legel, index) => {
                    return (
                      <MenuItem key={index} value={legel.value}>
                        {legel.title}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel>Tình trạng nội thất</InputLabel>
                <Select
                  value={selectFurniture}
                  onChange={(e: any) => {
                    setSelectFurnitutre(e.target.value);
                  }}
                  label='Tình trạng nội thất'
                >
                  {furnitureStatuses.map((furniture, index) => {
                    return (
                      <MenuItem key={index} value={furniture.value}>
                        {furniture.title}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl> */}
              {/* <Autocomplete
                options={options}
                renderInput={(params) => <TextField {...params} label='Tình trạng nội thất' />}
              /> */}

              <Stack>
                <Typography
                  sx={{
                    fontWeight: 'bold',
                  }}
                >
                  Sắp xếp theo
                </Typography>

                <Stack>
                  <RadioGroup
                    aria-labelledby='demo-row-radio-buttons-group-label'
                    name='row-radio-buttons-group'
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy((e.target as HTMLInputElement).value);
                    }}
                  >
                    <FormControlLabel
                      sx={{
                        justifyContent: 'space-between',
                      }}
                      labelPlacement='start'
                      value='posted_date'
                      control={<Radio />}
                      label='Tin mới trước'
                    />
                    <FormControlLabel
                      sx={{
                        justifyContent: 'space-between',
                      }}
                      labelPlacement='start'
                      value='price'
                      control={<Radio />}
                      label='Giá thấp trước'
                    />
                  </RadioGroup>
                </Stack>
              </Stack>

              <Stack>
                <Typography
                  sx={{
                    fontWeight: 'bold',
                  }}
                >
                  Đăng bởi
                </Typography>

                <Stack>
                  <RadioGroup
                    aria-labelledby='demo-row-radio-buttons-group-label'
                    name='row-radio-buttons-group'
                    value={postBy}
                    onChange={(e) => {
                      setPostBy((e.target as HTMLInputElement).value);
                    }}
                  >
                    <FormControlLabel
                      sx={{
                        justifyContent: 'space-between',
                      }}
                      labelPlacement='start'
                      value={true}
                      control={<Radio />}
                      label='Cá nhân'
                    />
                    <FormControlLabel
                      sx={{
                        justifyContent: 'space-between',
                      }}
                      labelPlacement='start'
                      value={false}
                      control={<Radio />}
                      label='Môi giới'
                    />
                  </RadioGroup>
                </Stack>
              </Stack>

              <Stack direction={'row'} justifyContent={'end'} spacing={1}>
                <Button
                  variant='text'
                  sx={{
                    color: '#1E7B5F',
                  }}
                  onClick={() => {
                    handCancle();
                  }}
                >
                  Đặt lại
                </Button>

                <Button
                  variant='contained'
                  sx={{
                    backgroundColor: '#1E7B5F',
                  }}
                  onClick={() => {
                    handleSearch();
                    handleClose();
                  }}
                >
                  Áp dụng
                </Button>
              </Stack>
            </Stack>
          </DialogContent>
        </Dialog>
      </Stack>
    </Stack>
  );
};
