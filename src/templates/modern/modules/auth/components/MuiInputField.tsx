import { InputBase, alpha, colors, styled } from '@mui/material';

const MuiInputField = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    borderRadius: 4,
    border: '2px solid',
    borderColor: '#79747E',
    fontSize: 16,
    width: '100%',
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
    '&:focus': {
      boxShadow: '#026d4d 0 0 0 0.05rem',
      borderColor: '#026d4d',
    },
    '&:hover': {
      borderColor: '#026d4d',
    },
  },
}));

export default MuiInputField;
