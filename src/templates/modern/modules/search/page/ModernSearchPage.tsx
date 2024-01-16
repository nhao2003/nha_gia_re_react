import { Stack } from '@mui/material';
import { ModernHeaderSearch } from '../component/ModernHeaderSearch';
import { ModernItemSearch } from '../component/ModernItemSearch';
import { ApiServiceBuilder } from '../../../../../services/api.service';
import { getParsedParams } from '../../../../../services/paramsSearch';
import React from 'react';
import type RealEstatePost from '../../../../../models/RealEstatePost';

export function ModernSearchPage(): JSX.Element {
  const [params, setParams] = React.useState({});

  const [posts, setPosts] = React.useState<{
    numOfPages: number;
    posts: RealEstatePost[];
  }>({ numOfPages: 1, posts: [] });

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
    console.log('params', getParsedParams(params));
    console.log('sanggg', params);
    fetchPosts()
      .then((response) => {
        setPosts({
          numOfPages: response.num_of_pages,
          posts: response.result,
        });
        console.log(11111);
      })
      .catch((error) => {
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
      <ModernItemSearch posts={posts.posts} numOfPages={posts.numOfPages} />
    </Stack>
  );
}
