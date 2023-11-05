import { Stack } from '@mui/material';
import { HeaderSearch } from '../components/HeaderSearch';
import { ItemSearch } from '../components/ItemSearch';

export function SearchPage(): JSX.Element {
    return (
        <Stack>
            <HeaderSearch />
            <ItemSearch />
        </Stack>
    )

}