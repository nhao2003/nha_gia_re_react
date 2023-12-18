import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
} from '@mui/material';
import { type SelectChangeEvent } from '@mui/material/Select';
import addressUtils, {type  District, type Ward } from '../../../../../utils/addressUtils';

interface ModernAddressDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (provinceIndex: number, districtIndex: number, wardIndex: number, detail: string) => void;
}

const AddressDialog: React.FC<ModernAddressDialogProps> = ({ open, onClose, onConfirm }) => {
  const [province, setProvince] = useState<number>(-1);
  const [district, setDistrict] = useState<number>(-1);
  const [ward, setWard] = useState<number>(-1);
  const [detail, setDetail] = useState<string>('');
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [provinceError, setProvinceError] = useState<boolean>(false);
  const [districtError, setDistrictError] = useState<boolean>(false);
  const [wardError, setWardError] = useState<boolean>(false);

  useEffect(() => {
    const fetchDistricts = async () => {
      const fetchedDistricts = addressUtils.getDistricts(province);
      setDistricts(fetchedDistricts);
    };

    void fetchDistricts();
  }, [province]);

  useEffect(() => {
    const fetchWards = async () => {
      const fetchedWards = addressUtils.getWards(province, district);
      setWards(fetchedWards);
    };

    void fetchWards();
  }, [province, district]);

  const handleProvinceChange = (event: SelectChangeEvent<string>) => {
    const selectedProvince = Number(event.target.value);
    setProvince(selectedProvince);
    setDistrict(-1);
    setWard(-1);
    setProvinceError(selectedProvince === -1);
  };

  const handleDistrictChange = (event: SelectChangeEvent<string>) => {
    const selectedDistrict = Number(event.target.value);
    setDistrict(selectedDistrict);
    setWard(-1);
    setDistrictError(selectedDistrict === -1);
  };

  const handleWardChange = (event: SelectChangeEvent<string>) => {
    const selectedWard = Number(event.target.value);
    setWard(selectedWard);
    setWardError(selectedWard === -1);
  };

  const handleConfirm = () => {
    const isProvinceValid = province !== -1;
    const isDistrictValid = district !== -1;
    const isWardValid = ward !== -1;

    if (isProvinceValid && isDistrictValid && isWardValid) {
      onConfirm(province, district, ward, detail);
      onClose();
    } else {
      setProvinceError(!isProvinceValid);
      setDistrictError(!isDistrictValid);
      setWardError(!isWardValid);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="address-dialog-title">
      <DialogTitle id="address-dialog-title">Chọn địa chỉ</DialogTitle>
      <DialogContent>
        <TextField
          select
          label="Tỉnh/Thành phố"
          value={province.toString()}
          onChange={(e) => { handleProvinceChange(e as SelectChangeEvent<string>); }}
          fullWidth
          margin="normal"
          error={provinceError}
          helperText={provinceError ? 'Vui lòng chọn tỉnh/thành phố' : ''}
        >
          {addressUtils.getProvinces().map((province) => (
            <MenuItem key={province.code} value={province.code}>
              {province.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Quận/Huyện"
          value={district.toString()}
          onChange={(e) => { handleDistrictChange(e as SelectChangeEvent<string>); }}
          fullWidth
          margin="normal"
          error={districtError}
          helperText={districtError ? 'Vui lòng chọn quận/huyện' : ''}
        >
          {districts.map((district) => (
            <MenuItem key={district.code} value={district.code}>
              {district.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Phường/Xã"
          value={ward.toString()}
          onChange={(e) => { handleWardChange(e as SelectChangeEvent<string>); }}
          fullWidth
          margin="normal"
          error={wardError}
          helperText={wardError ? 'Vui lòng chọn xã/phường' : ''}
        >
          {wards.map((ward) => (
            <MenuItem key={ward.code} value={ward.code}>
              {ward.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Chi tiết"
          value={detail}
          onChange={(e) => { setDetail(e.target.value); }}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Đóng
        </Button>
        <Button onClick={handleConfirm} color="primary">
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddressDialog;
