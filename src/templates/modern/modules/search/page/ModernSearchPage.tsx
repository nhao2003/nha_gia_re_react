import { Stack } from '@mui/material';
import { ModernHeaderSearch } from '../component/ModernHeaderSearch';
import { ModernItemSearch } from '../component/ModernItemSearch';

export function ModernSearchPage(): JSX.Element {
  return (
    <Stack>
      <ModernHeaderSearch />
      <ModernItemSearch />
    </Stack>
  );
}
