import { Stack } from '@mui/material';
import { ModernHeaderSearch } from '../component/ModernHeaderSearch';
import { ModernItemSearch } from '../component/ModernItemSearch';
import { ApiServiceBuilder } from '../../../../../services/api.service';
import { getParsedParams } from '../../../../../services/paramsSearch';
import React from 'react';

export function ModernSearchPage(): JSX.Element {
  const [params, setParams] = React.useState({});

  async function fetchPosts() {
    const query = new ApiServiceBuilder()
      .setBaseUrl('https://nha-gia-re-server.onrender.com/api/v1')
      .withUrl('/posts')
      .withParams(getParsedParams(params))
      .build();
    const response = await query.get();
    console.log(response.data);
    return response.data as any;
  }

  React.useEffect(() => {
    fetchPosts().catch((error) => {
      console.log(error);
    });
  }, [params]);

  return (
    <Stack>
      <ModernHeaderSearch
        onFilterButtonClick={(params) => {
          setParams(params);
        }}
      />
      <ModernItemSearch />
    </Stack>
  );
}
