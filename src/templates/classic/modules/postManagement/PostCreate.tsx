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
    Snackbar,
    Alert,
    type SnackbarOrigin,
    CircularProgress,
} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { type SxProps, type Theme } from '@mui/system';
import { ApartmentTypes, Direction, FurnitureStatus, HouseTypes, LandTypes, LegalDocumentStatus, OfficeTypes, apartmentTypeToString, directionEnumToString, furnitureStatusToString, houseTypeToString, landTypeToString, legalDocumentStatusToString, officeTypeToString } from '../../../../constants/enums';
import ModernAddressDialog from '../../../../templates/modern/components/Dialog/ModernAddressDialog';
import addressUtils from '../../../../utils/addressUtils';
import type { AparmentFeatures, HouseFeatures, LandFeatures, MotelFeatures, OfficeFeatures, PropertyListing } from '../../../../services/CreatePostData';
import PostService from '../../../../services/post.service';
import { LoadingButton } from '@mui/lab';
import payment from '../../../../templates/modern/assets/illustrations/payment.svg';
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

const ClassicCreatePost: React.FC = () => {
    const minPrice = 0;
    const maxPrice = 1000000000;
    const minArea = 0;
    const maxArea = 1000000;
    const minElectricityPrice = 0;
    const maxElectricityPrice = 10000000;
    const minWaterPrice = 0;
    const maxWaterPrice = 10000000;
    const minMeter = 1;
    const maxMeter = 1000000;
    const [area, setArea] = useState<number | null>(null);
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
    const [mWidth, setWidth] = useState<number | null>(null);
    const [mLength, setLength] = useState<number | null>(null);
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
    const [snackbar, setSnackBar] = useState<string>('');
    const [addressDialogOpen, setAddressDialogOpen] = useState<boolean>(false);
    const fileInputRef = useRef(null);
    const handleOpenDialog = () => {
        (fileInputRef as any).current.click();
    };

    function handleNumberInput(value: string, setState: React.Dispatch<React.SetStateAction<number | null>>, setError: React.Dispatch<React.SetStateAction<string | null>>, min: number, max: number) {
        const str = value.replace(/[^0-9]/g, '');
        const val = Number.parseInt(str);
        if (value.length === 0) {
            setState(null);
        }
        else if (!Number.isNaN(val) && val >= min && val <= max) {
            setState(Math.abs(val));
            setError(null);
        }
        else
            setError(`Giá trị phải nằm trong khoảng từ ${min} đến ${max}`);
    }

    function handleStringInput(value: string, setState: React.Dispatch<React.SetStateAction<string>>, setError: React.Dispatch<React.SetStateAction<string | null>>, maxChar: number, isRequired: boolean) {
        if (value.length === 0 && isRequired) {
            setError('Không được để trống');
        }
        else if (value.length > maxChar) {
            setError(`Không được nhập quá ${maxChar} ký tự`);
        }
        else {
            setState(value);
            setError(null);
        }
    }

    // Handle Error
    const [titleError, setTitleError] = useState<string | null>(null);
    const [descriptionError, setDescriptionError] = useState<string | null>(null);
    const [addressError, setAddressError] = useState<string | null>(null);
    const [areaError, setAreaError] = useState<string | null>(null);
    const [rentPriceError, setPriceError] = useState<string | null>(null);
    const [depositError, setDepositError] = useState<string | null>(null);
    const [mainDirectionError, setMainDirectionError] = useState<string | null>(null);
    const [landTypeError, setLandTypeError] = useState<string | null>(null);
    const [officeTypeError, setOfficeTypeError] = useState<string | null>(null);
    const [apartmentTypeError, setApartmentTypeError] = useState<string | null>(null);
    const [houseTypeError, setHouseTypeError] = useState<string | null>(null);
    const [waterPriceError, setWaterPriceError] = useState<string | null>(null);
    const [electricityPriceError, setElectricityPriceError] = useState<string | null>(null);
    const [isHandOverError, setIsHandOverError] = useState<string | null>(null);
    const [lengthError, setLengthError] = useState<string | null>(null);
    const [widthError, setWidthError] = useState<string | null>(null);
    const [usedAreaError, setUsedAreaError] = useState<string | null>(null);
    interface State extends SnackbarOrigin {
        isSuccessful: boolean;
        open: boolean;
        message: string;
    }
    const [state, setState] = React.useState<State>({
        isSuccessful: false,
        open: false,
        vertical: 'top',
        horizontal: 'center',
        message: '',
    });
    const handleValidate = () => {
        let isValid = true;
        if (title.trim().length === 0) {
            setTitleError('Tiêu đề không được để trống');
            isValid = false;
        }
        if (description.trim().length === 0) {
            setDescriptionError('Mô tả không được để trống');
            isValid = false;
        }
        if (address.trim().length === 0) {
            setAddressError('Địa chỉ không được để trống');
            isValid = false;
        } else if (addressDetail === null) {
            setAddressError('Địa chỉ không được để trống');
            isValid = false;
        }
        if (area === null) {
            setAreaError('Diện tích không được để trống');
            isValid = false;
        } else
            setAreaError(null);
        if (price === null) {
            setPriceError('Giá không được để trống');
            isValid = false;
        } else
            setPriceError(null);
        if (deposit === null && purposeType === 'rent') {
            setDepositError('Giá đặt cọc không được để trống');
            isValid = false;
        } else
            setDepositError(null);
        if (landType === null && propertyType === 'land') {
            setLandTypeError('Loại đất không được để trống');
            isValid = false;
        } else
            setLandTypeError(null);
        if (officeType === null && propertyType === 'office') {
            setOfficeTypeError('Loại văn phòng không được để trống');
            isValid = false;
        } else
            setOfficeTypeError(null);
        if (apartmentType === null && propertyType === 'apartment') {
            setApartmentTypeError('Loại căn hộ không được để trống');
            isValid = false;
        } else
            setApartmentTypeError(null);
        if (houseType === null && propertyType === 'house') {
            setHouseTypeError('Loại nhà không được để trống');
            isValid = false;
        } else
            setHouseTypeError(null);
        if (isHandOver === null && propertyType === 'apartment') {
            setIsHandOverError('Tình trạng bàn giao không được để trống');
            isValid = false;
        } else
            setIsHandOverError(null);
        if (waterPrice === null && propertyType === 'motel') {
            setWaterPriceError('Giá nước không được để trống');
            isValid = false;
        } else

            setWaterPriceError(null);
        if (electricityPrice === null && propertyType === 'motel') {
            setElectricityPriceError('Giá điện không được để trống');
            isValid = false;
        }
        else
            setElectricityPriceError(null);
        return isValid;
    }

    const onSubmit = () => {
        setLoading(true);
        if (handleValidate()) {
            console.log('Valid');
            handleCreatePost().then((res) => {
                console.log(res);
                // Go to home page
                if (res) {
                    setState({ ...state, open: true, message: 'Đăng bài thành công', isSuccessful: true });
                    // eslint-disable-next-line @typescript-eslint/no-floating-promises
                    new Promise((resolve) => setTimeout(resolve, 2000)).then(() => {
                        window.location.href = '/';
                    });
                } else {
                    setState({ ...state, open: true, message: 'Đã có lỗi xảy ra. Vui lòng thử lại sau', isSuccessful: false });
                }
            }).catch((err) => {
                console.log(err);
                setState({ ...state, open: true, message: 'Đã có lỗi xảy ra. Vui lòng thử lại sau', isSuccessful: false });
                setLoading(false);
            });

        } else {
            console.log('Invalid');
        }
    }

    const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>, setState: React.Dispatch<React.SetStateAction<string | null>>) => {
        setState(event.target.value as string);
    };





    // Upload image
    const [selectedImages, setSelectedImages] = useState<File[]>([]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files !== null) {
            const newImages = Array.from(files);
            setSelectedImages((prevImages) => [...prevImages, ...newImages]);
        }
    };

    const handleRemoveImage = (imageUrl: string) => {
        setSelectedImages((prevImages) => prevImages.filter((image) => image.name !== imageUrl));
    };

    function getMotelFeatures(): MotelFeatures {
        return {
            water_price: waterPrice,
            electric_price: electricityPrice,
            furniture_status: furnitureStatus ?? undefined,
        };
    }

    function getLandFeatures(): LandFeatures {
        const res: LandFeatures = {
            land_type: landType as LandTypes,
            land_lot_code: lotNumber,
            subdivision_name: subdivisionName,
            is_facade: isMatTien,
            has_wide_alley: isHem,
            is_widens_towards_the_back: isNoHau,
            land_direction: mainDirection ?? undefined,
            width: mWidth ?? undefined,
            length: mLength ?? undefined,
            legal_docment_status: legalDocumentStatus ?? undefined,
        }
        return res;
    }

    function getHouseFeatures(): HouseFeatures {
        const res: HouseFeatures = {
            house_type: houseType as HouseTypes,
            num_of_bed_rooms: numberOfBedroom ?? undefined,
            num_of_toilets: numberOfBathroom ?? undefined,
            num_of_floors: numberOfFloor ?? undefined,
            is_facade: isMatTien,
            has_wide_alley: isHem,
            is_widens_towards_the_back: isNoHau,
            main_door_direction: mainDirection ?? undefined,
            width: mWidth ?? undefined,
            length: mLength ?? undefined,
            area_used: usedArea ?? undefined,
        }
        return res;
    }
    function getApartmentFeatures(): AparmentFeatures {
        const res: AparmentFeatures = {
            furniture_status: furnitureStatus ?? undefined,
            apartment_type: apartmentType as ApartmentTypes,
            is_corner: isCorner,
            is_hand_over: isHandOver,
            num_of_bed_rooms: numberOfBedroom ?? undefined,
            num_of_toilets: numberOfBathroom ?? undefined,
            balcony_direction: balconyDirection ?? undefined,
            block,
            floor,
            legal_document_status: legalDocumentStatus ?? undefined,
        }
        return res;
    }

    function getOfficeFeatures(): OfficeFeatures {
        const res: OfficeFeatures = {
            furniture_status: furnitureStatus ?? undefined,
            office_type: officeType as OfficeTypes,
            is_facade: isMatTien,
            main_door_direction: mainDirection ?? undefined,
            block,
            floor,
            legal_docment_status: legalDocumentStatus ?? undefined,
        }
        return res;
    }

    function getFeatures(): MotelFeatures | LandFeatures | HouseFeatures | AparmentFeatures | OfficeFeatures {
        switch (propertyType) {
            case 'motel':
                return getMotelFeatures();
            case 'land':
                return getLandFeatures();
            case 'house':
                return getHouseFeatures();
            case 'apartment':
                return getApartmentFeatures();
            case 'office':
                return getOfficeFeatures();
            default:
                throw new Error('Invalid property type');
        }
    }

    async function handleCreatePost() {
        const features = getFeatures();
        const data: PropertyListing = {
            title,
            description,
            address: {
                province_code: addressDetail?.provinceIndex ?? 1,
                district_code: addressDetail?.districtIndex ?? 1,
                ward_code: addressDetail?.wardIndex ?? 1,
                detail: addressDetail?.detail,
            },
            medias: selectedImages,
            price: purposeType === 'rent' ? price : undefined,
            deposit: purposeType === 'rent' ? deposit : undefined,
            features,
            type_id: propertyType as 'apartment' | 'house' | 'land' | 'motel' | 'office',
            area: area ?? 0,
            is_lease: false,
            is_pro_seller: false
        }
        try {
            const reponse = await PostService.getInstance().createPost(data);
            console.log(reponse);
            return reponse !== null && (reponse as any).status === 'success';
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    const [checkPostLimit, setCheckPostLimit] = useState<{
        isExceeded: boolean;
        limitPostInMonth: number;
        countPostInMonth: number;
    } | null>(null);


    function handleCheckPostLimit() {
        PostService.getInstance().checkLimitPost().then((res) => {
            console.log("Check post limit: ", res);
            if (res !== null) {
                setCheckPostLimit(res);
            }
        }).catch((err) => {
            console.log(err);
            setState({ ...state, open: true, message: 'Đã có lỗi xảy ra. Vui lòng thử lại sau', isSuccessful: false });
        });
    }

    React.useEffect(() => {
        handleCheckPostLimit();
    }, []);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingX: '20px', minHeight: '100vh', marginTop: '20px' }}>
            <Snackbar open={state.open} autoHideDuration={3000} anchorOrigin={{ vertical: state.vertical, horizontal: state.horizontal }} onClose={() => { setSnackBar(''); }}>
                <Alert onClose={() => {
                    setState({ ...state, open: false });
                }} severity={state.isSuccessful ? 'success' : 'error'

                } sx={{ width: '100%' }}>
                    {state.message}
                </Alert>
            </Snackbar>
            {
                checkPostLimit === null &&
                <CustomCard sx={{ gap: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <CircularProgress />
                    <Typography variant="h6" gutterBottom component="div">
                        Đang kiểm tra số lượng bài đăng trong tháng
                    </Typography>
                </CustomCard>
            }
            {
                checkPostLimit !== null && checkPostLimit.isExceeded &&
                <CustomCard sx={{ gap: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="h6" gutterBottom component="div">
                        Bạn đã đăng quá số lượng bài đăng trong tháng
                    </Typography>
                    <Typography variant="body1" gutterBottom component="div">
                        Số lượng bài đăng trong tháng: {checkPostLimit.countPostInMonth}/{checkPostLimit.limitPostInMonth}
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <Typography variant="h5" gutterBottom component="div">
                            Gói PRO
                        </Typography>
                        <Typography variant="body1" gutterBottom component="div">
                            Là gói dịch vụ dành cho nhà đăng tin chuyên nghiệp; giúp tối ưu chi phí, thời gian và hiệu quả đăng tin.
                        </Typography>
                        <img src={payment}
                            alt="Limit post"
                            style={
                                {
                                    width: '50%',
                                    height: '50%',
                                    alignSelf: 'center',

                                }
                            }
                        />

                        <Button variant="contained"
                            sx={
                                {
                                    backgroundColor: '#DAC0A3',
                                    color: '#DEFAF5',
                                    ':hover': {
                                        backgroundColor: '#DAC0A3',
                                        color: '#DEFAF5',
                                    }
                                }
                            }
                            onClick={() => { window.location.href = '/purchase'; }}>Nâng cấp tài khoản</Button>
                        <Button 
                        sx={
                            {
                                backgroundColor: '#DEFAF5',
                                color: '#DAC0A3',
                                ':hover': {
                                    backgroundColor: '#DEFAF5',
                                    color: '#DAC0A3',
                                }
                            }
                        }
                        onClick={() => { window.location.href = '/'; }}>Trang chủ</Button>
                    </Box>

                </CustomCard>
            }
            {
                checkPostLimit !== null && !checkPostLimit.isExceeded &&
                <div>
                    <CustomCard>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {purposeTypes.map((option) => (
                                <Chip
                                    key={option.value}
                                    sx={{
                                        backgroundColor: purposeType === option.value ? '#DAC0A3' : '#F8F0E5',
                                        color: '#000000',
                                        ':hover': {
                                            backgroundColor: '#DAC0A3',
                                        }
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
                                                backgroundColor: userType === option.value ? '#DAC0A3' : '#F8F0E5',
                                                color: '#000000',
                                                ':hover': {
                                                    backgroundColor: '#DAC0A3',
                                                }
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
                                        handleStringInput(e.target.value, setTitle, setTitleError, 250, true);
                                    }}
                                    error={titleError !== null}
                                    helperText={titleError}
                                    inputProps={{ maxLength: 250 }}
                                />
                                <TextField
                                    id="description"
                                    label="Mô tả chi tiết"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    value={description}
                                    onChange={(e) => {
                                        handleStringInput(e.target.value, setDescription, setDescriptionError, 1000, true);
                                    }}
                                    error={descriptionError !== null}
                                    helperText={descriptionError}
                                    inputProps={{ maxLength: 1000 }}
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
                                            sx={{
                                                backgroundColor: '#DAC0A3',
                                                color: '#000000',
                                                ':hover': {
                                                    backgroundColor: '#DAC0A3',
                                                }
                                            }
                                        }
                                        >
                                            Chọn ảnh
                                        </Button>
                                    </div>
                                    <Box mt={2} sx={{
                                        // Border radius 12px and 1px border color #BDBDBD dotted
                                        borderRadius: '12px',
                                        border: '1px dashed #DAC0A3',
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
                                                    <AddPhotoAlternateIcon sx={{ fontSize: 36, color: '$DAC0A3' }} />
                                                    <Typography>Chưa có ảnh nào được chọn</Typography>
                                                </Box>
                                            ) :
                                                <Grid container spacing={2}>
                                                    {selectedImages.map((image) => {
                                                        const imageUrl = URL.createObjectURL(image);

                                                        return (
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
                                                        )
                                                    })}
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
                                                    backgroundColor: isHandOver === option.value ? '#DAC0A3' : '#F8F0E5',
                                                    color: '#000000',
                                                    ':hover': {
                                                        backgroundColor: '#DAC0A3',
                                                    }
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
                                                handleNumberInput(e.target.value, setElectricityPrice, setElectricityPriceError, minElectricityPrice, maxElectricityPrice);
                                            }}
                                            error={electricityPriceError !== null}
                                            helperText={electricityPriceError}
                                        />
                                        <TextField id="water-price" label="Tiền nước" fullWidth
                                            type='number'
                                            inputProps={{ min: 0 }}
                                            value={waterPrice} onChange={(e) => {
                                                handleNumberInput(e.target.value, setWaterPrice, setWaterPriceError, minWaterPrice, maxWaterPrice);
                                            }}
                                            error={waterPriceError !== null}
                                            helperText={waterPriceError}
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
                                        onChange={(e) => {
                                            handleNumberInput(e.target.value, setArea, setAreaError, minMeter, maxMeter);
                                        }}
                                        type='number'
                                        inputProps={{ min: 0 }}
                                        error={areaError !== null}
                                        helperText={areaError}
                                        value={area}
                                    />
                                    <TextField
                                        id="price"
                                        label="Giá"
                                        fullWidth
                                        onChange={(e) => {
                                            handleNumberInput(e.target.value, setRentPrice, setPriceError, minPrice, maxPrice);
                                        }}
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
                                            value={mWidth}
                                            onChange={(e) => {
                                                handleNumberInput(e.target.value, setWidth, setWidthError, minMeter, maxMeter);
                                            }}
                                            type='number'
                                            inputProps={{ min: 0 }}
                                            error={widthError !== null}
                                            helperText={widthError}
                                        />
                                        <TextField
                                            id="length"
                                            label="Chiều dài (m)"
                                            fullWidth
                                            value={mLength}
                                            onChange={(e) => {
                                                handleNumberInput(e.target.value, setLength, setLengthError, minMeter, maxMeter);
                                            }}
                                            type='number'
                                            inputProps={{ min: 0 }}
                                            error={lengthError !== null}
                                            helperText={lengthError}
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
                                        value={deposit}
                                        onChange={(e) => {
                                            handleNumberInput(e.target.value, setDeposit, setDepositError, minPrice, maxPrice);
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
                            <LoadingButton
                                variant="contained"
                                onClick={() => { onSubmit(); }}
                                sx={{ backgroundColor: '#DAC0A3', color: '#FFFFFF' }}
                                fullWidth
                                loading={loading}
                            >
                                Đăng bài
                            </LoadingButton>
                        </>
                    }
                </div>
            }
        </Box>
    );
};

export default ClassicCreatePost;
