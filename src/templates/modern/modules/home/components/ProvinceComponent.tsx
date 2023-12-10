import { Stack, Typography } from '@mui/material';
import CUSTOM_COLOR from '../../../../classic/constants/colors';

interface PrivateProps {
  sx: object;
  background: string;
  province: string;
}

export const ProvinceComponent = ({ sx, background, province }: PrivateProps) => {
  return (
    <Stack
      direction={'column'}
      sx={{
        ...sx,
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover', // Adjust as needed
        backgroundPosition: 'center', // Adjust as needed
        backgroundRepeat: 'no-repeat', // Adjust as needed
        borderRadius: '10px',
        width: '100%', // Đặt chiều rộng là 100%
        height: '150px', // Đặt chiều cao theo ý muốn
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Canh giữa theo chiều dọc
        justifyContent: 'flex-end', // Canh chữ dưới cùng theo chiều ngang
        padding: '5px',
      }}
    >
      <Typography
        sx={{
          color: CUSTOM_COLOR.white,
          fontSize: '18px',
          fontWeight: '600',
          letterSpacing: '2px',
        }}
        marginTop={2}
        marginLeft={2}
      >
        {province}
      </Typography>
    </Stack>
  );
};
