import { Box } from '@mui/material';

export default function ModernPackageListPage() {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'row', gap: '16px', paddingX: '20px', width: '100%', minHeight: '100vh' }}
    >
      <Box sx={{ flex: '1 1 auto' }}>Package List</Box>
      <Box sx={{ flex: '0 0 300px' }}>Package Detail</Box>
    </Box>
  );
}
