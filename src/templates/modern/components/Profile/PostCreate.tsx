import React, { useRef, useState } from 'react';
import {
    Box,
    Button,
    Card,
    Chip,
    MenuItem,
    Grid,
    Paper,
    IconButton,
    TextField,
    Typography,
    Checkbox,
    FormControlLabel,
} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { type SxProps, type Theme } from '@mui/system';
import { ApartmentTypes, Direction, FurnitureStatus, HouseTypes, LandTypes, LegalDocumentStatus, OfficeTypes, apartmentTypeToString, directionEnumToString, furnitureStatusToString, houseTypeToString, landTypeToString, legalDocumentStatusToString, officeTypeToString } from '../../../../constants/enums';
import ModernAddressDialog from '../Dialog/ModernAddressDialog';
import addressUtils from '../../../../utils/addressUtils';
export interface FormValues {
    purposeType: string;
    apartmentType: string;
    numberOfBedroom: string;
    numberOfBathroom: string;
    numberOfFloor: string;
    balconyDirection: string;
    floor: string;
    image: string;
}

const isHandedOvers = [
    { value: true, label: 'Đã bàn giao' },
    { value: false, label: 'Chưa bàn giao' },
];
const propertyTypes = [
    { value: 'apartment', label: 'Căn hộ' },
    { value: 'house', label: 'Nhà' },
    { value: 'land', label: 'Đất' },
    { value: 'motel', label: 'Nhà trọ' },
    { value: 'office', label: 'Văn phòng' },
];

const purposeTypes = [
    { value: 'rent', label: 'Cho thuê' },
    { value: 'sell', label: 'Bán' },
];

const userTypes = [
    { value: 'personal', label: 'Cá nhân' },
    { value: 'proseller', label: 'Môi giới' },
];

interface CustomCardProps {
    children: React.ReactNode;
    sx?: SxProps<Theme>;
}

const CustomCard: React.FC<CustomCardProps> = ({ children, sx, }: CustomCardProps) => (
    <Card sx={{ ...sx, backgroundColor: '#F6F6F6', boxShadow: 'none', borderRadius: '12px', padding: '16px' }}>
        {children}
    </Card>
);
interface Address {
    provinceIndex: number;
    districtIndex: number;
    wardIndex: number;
    detail: string | null;
}

const PostCreate: React.FC = () => {
    const maxPrice = 1000000000;
    const minPrice = 0;
    const minMeter = 0;
    const maxMeter = 1000000;
    const minNum = 0;
    const maxNum = 100;



    const [propertyType, setPropertyType] = useState<string | null>(null);
    const [purposeType, setPurposeType] = useState<'rent' | 'sell'>('rent');
    const [userType, setUserType] = useState<'personal' | 'proseller'>('personal');
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [addressDetail, setAddressDetail] = useState<Address | null>(null);
    const [furnitureStatus, setFurnitureStatus] = useState<FurnitureStatus | null>(null);
    const [legalDocumentStatus, setLegalDocumentStatus] = useState<LegalDocumentStatus | null>(null);
    const [usedArea, setUsedArea] = useState<number | null>(null);
    const [width, setWidth] = useState<number | null>(null);
    const [length, setLength] = useState<number | null>(null);
    const [electricityPrice, setElectricityPrice] = useState<number | null>(null);
    const [waterPrice, setWaterPrice] = useState<number | null>(null);
    const [price, setRentPrice] = useState<number | null>(null);
    const [deposit, setDeposit] = useState<number | null>(null);
    const [mainDirection, setMainDirection] = useState<Direction | null>(null);
    const [isCorner, setIsCorner] = useState<boolean>(false);
    const [isHem, setIsHem] = useState<boolean>(false);
    const [isNoHau, setIsNoHau] = useState<boolean>(false);
    const [isMatTien, setIsMatTien] = useState<boolean>(false);
    const [subdivisionName, setSubdivisionName] = useState<string>('');
    const [lotNumber, setLotNumber] = useState<string>('');
    const [landType, setLandType] = useState<LandTypes | null>(null);
    const [officeType, setOfficeType] = useState<OfficeTypes | null>(null);
    const [apartmentType, setApartmentType] = useState<ApartmentTypes | null>(null);
    const [houseType, setHouseType] = useState<HouseTypes | null>(null);
    const [numberOfBedroom, setNumberOfBedroom] = useState<number | null>(null);
    const [numberOfBathroom, setNumberOfBathroom] = useState<number | null>(null);
    const [numberOfFloor, setNumberOfFloor] = useState<number | null>(null);
    const [balconyDirection, setBalconyDirection] = useState<Direction | null>(null);
    const [floor, setFloor] = useState<string>('');
    const [block, setBlock] = useState<string>('');
    const [isHandOver, setIsHandOver] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [addressDialogOpen, setAddressDialogOpen] = useState<boolean>(false);
    const fileInputRef = useRef(null);
    const handleOpenDialog = () => {
        (fileInputRef as any).current.click();
    };

    // Handle Error
    const [titleError, setTitleError] = useState<string | null>(null);
    const [descriptionError, setDescriptionError] = useState<string | null>(null);
    const [addressError, setAddressError] = useState<string | null>(null);
    const [furnitureStatusError, setFurnitureStatusError] = useState<string | null>(null);
    const [legalDocumentStatusError, setLegalDocumentStatusError] = useState<string | null>(null);
    const [usedAreaError, setUsedAreaError] = useState<string | null>(null);
    const [widthError, setWidthError] = useState<string | null>(null);
    const [lengthError, setLengthError] = useState<string | null>(null);
    const [electricityPriceError, setElectricityPriceError] = useState<string | null>(null);
    const [waterPriceError, setWaterPriceError] = useState<string | null>(null);
    const [rentPriceError, setPriceError] = useState<string | null>(null);
    const [depositError, setDepositError] = useState<string | null>(null);
    const [mainDirectionError, setMainDirectionError] = useState<string | null>(null);
    const [isCornerError, setIsCornerError] = useState<string | null>(null);
    const [isHemError, setIsHemError] = useState<string | null>(null);
    const [isNoHauError, setIsNoHauError] = useState<string | null>(null);
    const [isMatTienError, setIsMatTienError] = useState<string | null>(null);
    const [subdivisionNameError, setSubdivisionNameError] = useState<string | null>(null);
    const [lotNumberError, setLotNumberError] = useState<string | null>(null);
    const [landTypeError, setLandTypeError] = useState<string | null>(null);
    const [officeTypeError, setOfficeTypeError] = useState<string | null>(null);
    const [apartmentTypeError, setApartmentTypeError] = useState<string | null>(null);
    const [houseTypeError, setHouseTypeError] = useState<string | null>(null);
    const [numberOfBedroomError, setNumberOfBedroomError] = useState<string | null>(null);
    const [numberOfBathroomError, setNumberOfBathroomError] = useState<string | null>(null);
    const [numberOfFloorError, setNumberOfFloorError] = useState<string | null>(null);
    const [balconyDirectionError, setBalconyDirectionError] = useState<string | null>(null);
    const [floorError, setFloorError] = useState<string | null>(null);
    const [blockError, setBlockError] = useState<string | null>(null);
    const [isHandOverError, setIsHandOverError] = useState<string | null>(null);

    const handleValidate = () => {
        let isValid = true;
        if (title.trim().length === 0) {
            setTitleError('Tiêu đề không được để trống');
            isValid = false;
        } else if (title.trim().length > 100) {
            setTitleError('Tiêu đề không được quá 100 ký tự');
            isValid = false;
        }
        if (description.trim().length === 0) {
            setDescriptionError('Mô tả không được để trống');
            isValid = false;
        } else if (description.trim().length > 500) {
            setDescriptionError('Mô tả không được quá 500 ký tự');
            isValid = false;
        }
        if (address.trim().length === 0) {
            setAddressError('Địa chỉ không được để trống');
            isValid = false;
        } else if (addressDetail === null) {
            setAddressError('Địa chỉ không được để trống');
            isValid = false;
        }
        if (furnitureStatus === null) {
            setFurnitureStatusError('Tình trạng nội thất không được để trống');
            isValid = false;
        } else
            setFurnitureStatusError(null);
        if (legalDocumentStatus === null) {
            setLegalDocumentStatusError('Tình trạng pháp lý không được để trống');
            isValid = false;
        } else
            setLegalDocumentStatusError(null);
        if (usedArea === null) {
            setUsedAreaError('Diện tích không được để trống');
            isValid = false;
        } else
            setUsedAreaError(null);
        if (width === null) {
            setWidthError('Chiều ngang không được để trống');
            isValid = false;
        } else
            setWidthError(null);
        if (length === null) {
            setLengthError('Chiều dài không được để trống');
            isValid = false;
        } else
            setLengthError(null);
        if (electricityPrice === null) {
            setElectricityPriceError('Tiền điện không được để trống');
            isValid = false;
        } else
            setElectricityPriceError(null);
        if (waterPrice === null) {
            setWaterPriceError('Tiền nước không được để trống');
            isValid = false;
        } else
            setWaterPriceError(null);
        if (price === null) {
            setPriceError('Giá thuê không được để trống');
            isValid = false;
        } else
            setPriceError(null);
        if (deposit === null && purposeType === 'rent') {
            setDepositError('Giá đặt cọc không được để trống');
            isValid = false;
        } else
            setDepositError(null);
        if (mainDirection === null) {
            setMainDirectionError('Hướng chính không được để trống');
            isValid = false;
        } else
            setMainDirectionError(null);
        if (subdivisionName.trim().length === 0) {
            setSubdivisionNameError('Tên phân khu không được để trống');
            isValid = false;
        } else
            setSubdivisionNameError(null);
        if (lotNumber.trim().length === 0) {
            setLotNumberError('Mã lô không được để trống');
            isValid = false;
        } else
            setLotNumberError(null);
        if (landType === null) {
            setLandTypeError('Loại đất không được để trống');
            isValid = false;
        } else
            setLandTypeError(null);
        if (officeType === null) {
            setOfficeTypeError('Loại văn phòng không được để trống');
            isValid = false;
        } else
            setOfficeTypeError(null);
        if (apartmentType === null) {
            setApartmentTypeError('Loại căn hộ không được để trống');
            isValid = false;
        } else
            setApartmentTypeError(null);
        if (houseType === null) {
            setHouseTypeError('Loại nhà không được để trống');
            isValid = false;
        } else
            setHouseTypeError(null);
        if (numberOfBedroom === null) {
            setNumberOfBedroomError('Số phòng ngủ không được để trống');
            isValid = false;
        } else
            setNumberOfBedroomError(null);
        if (numberOfBathroom === null) {
            setNumberOfBathroomError('Số phòng vệ sinh không được để trống');
            isValid = false;
        } else
            setNumberOfBathroomError(null);
        if (numberOfFloor === null) {
            setNumberOfFloorError('Số tầng không được để trống');
            isValid = false;
        } else
            setNumberOfFloorError(null);
        if (balconyDirection === null) {
            setBalconyDirectionError('Hướng ban công không được để trống');
            isValid = false;
        } else
            setBalconyDirectionError(null);
        if (floor.trim().length === 0) {
            setFloorError('Tầng không được để trống');
            isValid = false;
        } else
            setFloorError(null);
        if (block.trim().length === 0) {
            setBlockError('Block/Tháp không được để trống');
            isValid = false;
        } else
            setBlockError(null);
        if (isHandOver === null) {
            setIsHandOverError('Tình trạng bàn giao không được để trống');
            isValid = false;
        } else
            setIsHandOverError(null);
        return isValid;
    }

    const onSubmit = () => {
        if (handleValidate()) {
            console.log('Valid');
        }
    }

    const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>, setState: React.Dispatch<React.SetStateAction<string | null>>) => {
        setState(event.target.value as string);
    };





    // Upload image
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files != null) {
            const selectedImageUrls = Array.from(files).map((file) =>
                URL.createObjectURL(file)
            );
            setSelectedImages((prevImages) => [...prevImages, ...selectedImageUrls]);
        }
    };

    const handleRemoveImage = (imageUrl: string) => {
        setSelectedImages((prevImages) =>
            prevImages.filter((image) => image !== imageUrl)
        );
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <CustomCard>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {purposeTypes.map((option) => (
                        <Chip
                            key={option.value}
                            sx={{
                                backgroundColor: purposeType === option.value ? '#026D4D' : '#DEFAF5',
                                color: purposeType === option.value ? '#DEFAF5' : '#026D4D',
                            }}
                            label={option.label}
                            color={(option.value === propertyType) ? 'primary' : 'default'}
                            onClick={() => {
                                setPurposeType(option.value as 'rent' | 'sell');
                                setPropertyType(null);
                            }}
                        />
                    ))}
                </div>
                <TextField
                    id="property-type-select"
                    select
                    label="Loại bất động sản"
                    fullWidth
                    value={propertyType}
                    onChange={(e) => { handleSelectChange(e, setPropertyType); }}
                    sx={{ marginTop: '16px' }}
                >
                    {propertyTypes.map((option) => (
                        (option.value === 'motel' && purposeType === 'sell') ? null
                            :
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                    ))}
                </TextField>

            </CustomCard>
            {
                propertyType !== null &&
                <>

                    <CustomCard>
                        <Typography variant="h6" gutterBottom component="div">
                            Bạn là
                        </Typography>
                        <div style={{ marginTop: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {userTypes.map((option) => (
                                <Chip
                                    key={option.value}
                                    sx={{
                                        backgroundColor: userType === option.value ? '#026D4D' : '#DEFAF5',
                                        color: userType === option.value ? '#DEFAF5' : '#026D4D',
                                    }}
                                    label={option.label}
                                    color={userType === option.value ? 'primary' : 'default'}
                                    onClick={() => { setUserType(option.value as 'personal' | 'proseller'); }}
                                />
                            ))}
                        </div>
                    </CustomCard>

                    <CustomCard sx={{ gap: '16px', display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" gutterBottom component="div">
                            Thông tin bài đăng
                        </Typography>
                        <TextField
                            id="title"
                            label="Tiêu đề"
                            fullWidth
                            value={title}
                            onChange={(e) => {
                                setTitleError(null);
                                setTitle(e.target.value);
                            }}
                            error={titleError !== null}
                            helperText={titleError}
                        />
                        <TextField
                            id="description"
                            label="Mô tả chi tiết"
                            fullWidth
                            multiline
                            rows={4}
                            value={description}
                            onChange={(e) => { setDescription(e.target.value); setDescriptionError(null); }}
                            error={descriptionError !== null}
                            helperText={descriptionError}
                        />
                    </CustomCard>
                    <CustomCard sx={{ gap: '16px', display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" gutterBottom component="div">
                            Địa chỉ và hình ảnh
                        </Typography>
                        {/* Chọn địa chỉ */}
                        <TextField
                            InputProps={{
                                readOnly: true,
                            }}
                            id="address"
                            label="Địa chỉ"
                            fullWidth
                            value={address}
                            onClick={
                                () => {
                                    setAddressDialogOpen(true);
                                }
                            }
                            error={addressError !== null}
                            helperText={addressError}
                        />
                        <ModernAddressDialog
                            open={addressDialogOpen}
                            onClose={
                                () => {
                                    setAddressDialogOpen(false);
                                }
                            }
                            onConfirm={(provinceIndex, districtIndex, wardIndex, detail) => {
                                const addressVal = addressUtils.getDetailedAddress(provinceIndex, districtIndex, wardIndex) ?? '';
                                const detailVal = ((detail?.trim() ?? ''.length > 0).length > 0) ? `${detail}, ` : '';
                                setAddress(`${detailVal}${addressVal}`);
                                setAddressDetail({
                                    provinceIndex,
                                    districtIndex,
                                    wardIndex,
                                    detail,
                                });
                            }}
                        />
                        <Box>
                            <div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    ref={fileInputRef}
                                    multiple
                                    style={{ display: 'none' }}
                                />

                                <Button
                                    onClick={handleOpenDialog}
                                    variant="contained"
                                    startIcon={<AddPhotoAlternateIcon />}
                                >
                                    Chọn ảnh
                                </Button>
                            </div>
                            <Box mt={2} sx={{
                                // Border radius 12px and 1px border color #BDBDBD dotted
                                borderRadius: '12px',
                                border: '1px dashed #026D4D',
                                overflow: 'hidden',
                                padding: '8px',
                            }}>
                                {
                                    selectedImages.length === 0 ? (
                                        <Box sx={{
                                            display: 'flex',
                                            height: '340px',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            gap: '14px',
                                            alignSelf: 'stretch',
                                        }}>
                                            <AddPhotoAlternateIcon sx={{ fontSize: 36, color: '$026D4D' }} />
                                            <Typography>Chưa có ảnh nào được chọn</Typography>
                                        </Box>
                                    ) :
                                        <Grid container spacing={2}>
                                            {selectedImages.map((imageUrl) => (
                                                <Grid item key={imageUrl}>
                                                    <Paper elevation={3} sx={{ maxWidth: '100px' }}>
                                                        <Box position="relative" >
                                                            <img
                                                                src={imageUrl}
                                                                alt="Selected"
                                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                            />
                                                            <IconButton
                                                                onClick={() => { handleRemoveImage(imageUrl); }}
                                                                style={{ position: 'absolute', top: 0, right: 0 }}
                                                            >
                                                                <Typography>X</Typography>
                                                            </IconButton>
                                                        </Box>
                                                    </Paper>

                                                </Grid>
                                            ))}
                                        </Grid>
                                }
                            </Box>
                        </Box>
                    </CustomCard>

                    <CustomCard sx={{ gap: '16px', display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" gutterBottom component="div">
                            Thông tin chi tiết
                        </Typography>
                        {/* Tên phân khu, Mã lô */}
                        {
                            ['land'].includes(propertyType ?? '') &&
                            <Box sx={{ display: 'flex', gap: '16px' }}>
                                <TextField
                                    id="subdivision-name" label="Tên phân khu" fullWidth
                                    inputProps={{ maxLength: 100 }}
                                    value={subdivisionName} onChange={(e) => { setSubdivisionName(e.target.value); }}
                                />
                                <TextField id="lot-number" label="Mã lô" fullWidth
                                    inputProps={{ maxLength: 100 }}
                                    value={lotNumber} onChange={(e) => { setLotNumber(e.target.value); }}
                                />
                            </Box>
                        }
                        {
                            propertyType === 'land' &&
                            <TextField id="land-type" select label="Loại đất" fullWidth
                                value={landType} onChange={(e) => { setLandType(e.target.value as LandTypes); setLandTypeError(null); }}
                                error={landTypeError !== null}
                                helperText={landTypeError}
                            >
                                {
                                    Object.values(LandTypes).map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {landTypeToString(option)}
                                        </MenuItem>
                                    ))
                                }
                            </TextField>
                        }
                        {
                            // Loại văn phòng
                            propertyType === 'office' &&
                            <TextField id="office-type" select label="Loại văn phòng" fullWidth
                                value={officeType} onChange={(e) => { setOfficeType(e.target.value as OfficeTypes); setOfficeTypeError(null); }}
                                error={officeTypeError !== null}
                                helperText={officeTypeError}
                            >
                                {
                                    Object.values(OfficeTypes).map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {officeTypeToString(option)}
                                        </MenuItem>
                                    ))
                                }
                            </TextField>
                        }
                        {/* Tình trạng bàn giao */
                            propertyType === 'apartment' &&
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                {isHandedOvers.map((option) => (
                                    <Chip
                                        key={option.value.toString()}
                                        sx={{
                                            backgroundColor: isHandOver === option.value ? '#026D4D' : '#DEFAF5',
                                            color: isHandOver === option.value ? '#DEFAF5' : '#026D4D',
                                        }}
                                        label={option.label}
                                        color={isHandOver === option.value ? 'primary' : 'default'}
                                        onClick={() => {
                                            setIsHandOver(option.value);
                                        }}
                                    />
                                ))}
                            </div>
                        }
                        {
                            propertyType === 'apartment' &&
                            <TextField id="apartment-type-select" select label="Loại căn hộ" fullWidth
                                value={apartmentType} onChange={(e) => { setApartmentType(e.target.value as ApartmentTypes); setApartmentTypeError(null); }}
                                error={apartmentTypeError !== null}
                                helperText={apartmentTypeError}
                            >
                                {Object.values(ApartmentTypes).map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {apartmentTypeToString(option)}
                                    </MenuItem>
                                ))}
                            </TextField>
                        }
                        {
                            propertyType === 'house' &&
                            <TextField id="house-type-select" select label="Loại nhà ở"
                                value={houseType}
                                error={houseTypeError !== null}
                                fullWidth onChange={(e) => {
                                    setHouseTypeError(null);
                                    setHouseType(e.target.value as HouseTypes);
                                }} >
                                {Object.values(HouseTypes).map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {houseTypeToString(option)}
                                    </MenuItem>
                                ))}
                            </TextField>
                        }
                        {
                            ['house', 'apartment'].includes(propertyType ?? '') &&
                            <Box sx={{ display: 'flex', gap: '16px' }}>
                                <TextField id="number-of-bedroom" label="Số phòng ngủ"
                                    value={numberOfBedroom}
                                    // Minimum value is 0
                                    inputProps={{ min: 0 }}
                                    fullWidth onChange={(e) => {
                                        setNumberOfBedroom(e.target.value.length === 0 ? null : Number.parseInt(e.target.value));
                                    }} type='number' />
                                <TextField id="number-of-bathroom" label="Số phòng vệ sinh"
                                    value={numberOfBathroom}
                                    // Minimum value is 0
                                    inputProps={{ min: 0 }}
                                    fullWidth onChange={(e) => {
                                        setNumberOfBathroom(e.target.value.length === 0 ? null : Number.parseInt(e.target.value));
                                    }} type='number' />
                            </Box>
                        }

                        {
                            propertyType === 'apartment' &&
                            <Box sx={{ display: 'flex', gap: '16px' }}>
                                <TextField id="number-of-floor" label="Số tầng" fullWidth
                                    value={numberOfFloor}
                                    inputProps={{ min: 0 }}
                                    type='number'
                                    onChange={(e) => {
                                        setNumberOfFloor(Number.parseInt(e.target.value));
                                    }} />

                                <TextField
                                    id="balcony-direction"
                                    label="Hướng ban công"
                                    fullWidth
                                    select
                                    value={balconyDirection}
                                    onChange={(e) => {
                                        setBalconyDirection(e.target.value as Direction);
                                    }}
                                >
                                    {Object.values(Direction).map((direction) => (
                                        <MenuItem key={direction} value={direction}>
                                            {directionEnumToString(direction)}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Box>
                        }
                        {
                            ['house', 'land', 'office'].includes(propertyType ?? '') &&
                            <Box sx={{ display: 'flex', gap: '16px' }}>
                                <TextField
                                    id="main-direction"
                                    label={['house', 'office'].includes(propertyType ?? '') ? 'Hướng cửa chính' : 'Hướng đất'}
                                    fullWidth
                                    select
                                    value={mainDirection}
                                    onChange={(e) => {
                                        setMainDirection(e.target.value as Direction);
                                    }}
                                >
                                    {Object.values(Direction).map((direction) => (
                                        <MenuItem key={direction} value={direction}>
                                            {directionEnumToString(direction)}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Box>
                        }


                        {
                            propertyType === 'apartment' &&
                            <Box sx={{ display: 'flex', gap: '16px' }}>
                                <TextField id="floor" label="Tầng" fullWidth
                                    value={floor}
                                    onChange={(e) => {
                                        setFloor(e.target.value);
                                    }} />
                                <TextField id="block" label="Block/Tháp"
                                    value={block}
                                    fullWidth onChange={(e) => {
                                        setBlock(e.target.value);

                                    }} />
                            </Box>
                        }
                        {
                            // Tiền điện, tiền nước
                            propertyType === 'motel' &&
                            <Box sx={{ display: 'flex', gap: '16px' }}>
                                <TextField id="electricity-price" label="Tiền điện" fullWidth
                                    type='number'
                                    inputProps={{ min: 0 }}
                                    value={electricityPrice} onChange={(e) => {
                                        setElectricityPrice(Number.parseInt(e.target.value));
                                    }}
                                />
                                <TextField id="water-price" label="Tiền nước" fullWidth
                                    type='number'
                                    inputProps={{ min: 0 }}
                                    value={waterPrice} onChange={(e) => {
                                        setWaterPrice(Number.parseInt(e.target.value));
                                    }}
                                />
                            </Box>
                        }

                    </CustomCard>

                    <CustomCard>
                        <Typography variant="h6" gutterBottom component="div">
                            Diện tích và giá
                        </Typography>
                        <Box sx={{ display: 'flex', gap: '16px' }}>
                            <TextField
                                id="area"
                                label="Diện tích (m2)"
                                fullWidth
                                onChange={(e) => { setUsedArea(Number.parseInt(e.target.value)); }}
                                type='number'
                                inputProps={{ min: 0 }}
                                error={usedAreaError !== null}
                                helperText={usedAreaError}
                            />
                            <TextField
                                id="price"
                                label="Giá"
                                fullWidth
                                onChange={(e) => { setRentPrice(Number.parseInt(e.target.value)); }}
                                type='number'
                                inputProps={{ min: 0 }}
                                error={rentPriceError !== null}
                                helperText={rentPriceError}
                            />
                        </Box>
                        {/* Diện tích sử dụng */}
                        {
                            propertyType === 'house' &&
                            <TextField
                                id="used-area"
                                label="Diện tích sử dụng (m2)"
                                fullWidth
                                sx={{ marginTop: '16px' }}
                                onChange={(e) => { setUsedArea(Number.parseInt(e.target.value)); }}
                                value={usedArea}
                                type='number'
                                inputProps={{ min: 0 }}

                            />
                        }
                        {/* Chiều ngang, chiều dài */}
                        {
                            ['house', 'land'].includes(propertyType ?? '') &&
                            <Box sx={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                                <TextField
                                    id="width"
                                    label="Chiều ngang (m)"
                                    fullWidth
                                    value={width} onChange={(e) => { setWidth(Number.parseInt(e.target.value)); }}
                                    type='number'
                                    inputProps={{ min: 0 }}
                                />
                                <TextField
                                    id="length"
                                    label="Chiều dài (m)"
                                    fullWidth
                                    value={length} onChange={(e) => { setLength(Number.parseInt(e.target.value)); }}
                                    type='number'
                                    inputProps={{ min: 0 }}

                                />
                            </Box>
                        }

                        {/* Giá đặt cọc */}
                        {
                            purposeType === 'rent' &&
                            <TextField
                                id="deposit"
                                label="Giá đặt cọc"
                                fullWidth
                                sx={{ marginTop: '16px' }}
                                value={deposit} onChange={(e) => {
                                    const val = Number.parseInt(e.target.value);
                                    if (e.target.value.length === 0)
                                        setDeposit(null);
                                    else
                                        if (!Number.isNaN(val) && val >= minPrice && val <= maxPrice)
                                            setDeposit(Math.abs(val));

                                }}
                                type='number'
                                inputProps={{ min: minPrice, max: maxPrice }}
                                error={depositError !== null}
                                helperText={depositError}
                            />
                        }
                    </CustomCard>
                    {/* Tiện ích */}
                    <CustomCard>
                        <Typography variant="h6" gutterBottom component="div">
                            Tiện ích
                        </Typography>
                        <Box sx={{ display: 'flex', gap: '16px' }}>
                            {
                                propertyType !== 'land' &&
                                <TextField
                                    id="furniture"
                                    label="Tình trạng nội thất"
                                    fullWidth
                                    select
                                    onChange={(e) => {
                                        setFurnitureStatus(e.target.value as FurnitureStatus);
                                    }}
                                    value={furnitureStatus}
                                >
                                    {
                                        Object.values(FurnitureStatus).map((status) => (
                                            <MenuItem key={status} value={status}>{furnitureStatusToString(status)}</MenuItem>
                                        ))
                                    }
                                </TextField>
                            }
                            {
                                propertyType !== 'motel' &&
                                <TextField
                                    id="lega;-document-status"
                                    label="Tình trạng pháp lý"
                                    fullWidth
                                    select
                                    value={legalDocumentStatus}
                                    onChange={(e) => {
                                        setLegalDocumentStatus(e.target.value as LegalDocumentStatus);
                                    }}
                                >
                                    {
                                        Object.values(LegalDocumentStatus).map((status) => (
                                            <MenuItem key={status} value={status}>{legalDocumentStatusToString(status)}</MenuItem>
                                        ))
                                    }

                                </TextField>
                            }
                        </Box>
                        {/* Check box */}
                        {
                            propertyType === 'apartment' &&
                            <FormControlLabel control={<Checkbox
                                checked={isCorner}
                                onChange={(e) => { setIsCorner(e.target.checked); }}
                            />} label="Căn góc"

                            />
                        }
                        {
                            ['house', 'land'].includes(propertyType ?? '')
                            && <>

                                <FormControlLabel control={<Checkbox
                                    value={isHem}
                                    onChange={(e) => { setIsHem(e.target.checked); }}
                                />} label="Hẻm xe hơi" />
                                <FormControlLabel control={<Checkbox
                                    value={isNoHau}
                                    onChange={(e) => { setIsNoHau(e.target.checked); }}
                                />} label="Nở hậu" /></>
                        }
                        {
                            ['house', 'land', 'office'].includes(propertyType ?? '') &&
                            <FormControlLabel control={<Checkbox
                                value={isMatTien}
                                onChange={(e) => { setIsMatTien(e.target.checked); }}
                            />} label="Mặt tiền" />
                        }
                    </CustomCard>
                    <Button
                        variant="contained"
                        onClick={() => { onSubmit(); }}
                        sx={{ backgroundColor: '#026D4D', color: '#FFFFFF' }}
                        fullWidth
                    >
                        Đăng bài
                    </Button>
                </>
            }
        </Box>
    );
};

export default PostCreate;
