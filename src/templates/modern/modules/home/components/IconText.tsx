import { Stack, Typography } from '@mui/material';

interface PrivateProps {
  icon: any;
  title: string;
  color: any;
  sx?: object;
}

export const IconText = ({ icon, title, color, sx }: PrivateProps) => {
  return (
    <Stack
      direction={'row'}
      sx={{
        ...sx,
        alignItems: 'center',
      }}
    >
      <img
        src={icon}
        style={{
          height: '25px',
          width: '25px',
          color: color,
        }}
      />
      <Typography sx={styleTyporaphy} style={{ color: color }}>
        {title}
      </Typography>
    </Stack>
  );
};

const styleTyporaphy = {
  fontSize: '20px',
  marginLeft: '2px',
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 1,
};
