import { ButtonBase, Stack, Typography } from '@mui/material';
import CUSTOM_COLOR from '../../../../classic/constants/colors';

interface PrivateProps {
  sx: object;
  background: string;
  province: string;
  onClick?: () => void; // Thêm onClick callback
}

export const ProvinceComponent = ({ sx, background, province, onClick }: PrivateProps) => {
  const handleButtonClick = () => {
    if (onClick !== null && onClick !== undefined) {
      onClick();
    }
  };

  return (
    <ButtonBase
      role='button' // Set role to 'button' for accessibility
      tabIndex={0} // Make the component focusable
      sx={{
        ...sx,
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        borderRadius: '10px',
        width: '100%',
        height: '150px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '5px',
        transition: 'transform 0.3s ease-in-out', // Add a transition for the transform property
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          transform: 'scale(1.05)', // Scale up on hover
        },
        '&:active': {
          transform: 'scale(0.95)', // Scale down on click
        },
      }}
      onClick={handleButtonClick}
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
    </ButtonBase>
  );
};
