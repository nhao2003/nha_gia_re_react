import { Stack, Typography } from '@mui/material';

interface PrivateProps {
  icon: any;
  title: any;
  color: any;
  sx?: object;
  sizeIcon?: string;
  fontSize?: string;
  maxLine?: number;
}

export const IconText = ({ icon, title, color, sx, sizeIcon, fontSize, maxLine }: PrivateProps) => {
  const styleTyporaphy = {
    fontSize: fontSize ?? '20px',
    marginLeft: '2px',
    display: '-webkit-box',
    overflow: 'hidden',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: maxLine ?? 1,
  };

  return (
    <Stack
      direction={'row'}
      sx={{
        ...sx,
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      <img
        src={icon}
        style={{
          height: sizeIcon ?? '25px',
          width: sizeIcon ?? '25px',
          color: color,
          marginRight: '5px',
          marginTop: '2px',
        }}
      />
      <Typography sx={styleTyporaphy} style={{ color: color }}>
        {title}
      </Typography>
    </Stack>
  );
};
