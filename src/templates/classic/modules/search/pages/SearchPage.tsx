import { Stack } from '@mui/material';
import { HeaderSearch } from '../components/HeaderSearch';
import { ItemSearch } from '../components/ItemSearch';
import type RealEstatePost from '../../../../../models/RealEstatePost';
import React, { useEffect } from 'react';
import { ApiServiceBuilder } from '../../../../../services/api.service';
import { getParsedParams } from '../../../../../services/paramsSearch';
import { useLocation } from 'react-router-dom';

export function SearchPage(): JSX.Element {
  const type = useLocation().pathname.split('/')[2];
  const [value, setValue] = React.useState<string>(useLocation().state as string);

  console.log('TYPE', type);
  console.log('VALUE', value);

  // type: province || value: province code
  // type: nearby, sell, lease || value: null
  // type: relate || value: post title

  const [params, setParams] = React.useState({});
  const [isLease, setIsLease] = React.useState(true);

  useEffect(() => {
    if (type === 'province') {
      setParams((params) => ({ ...params, province_code: value }));
    } else if (type === 'sell') {
      setIsLease(false);
      setParams((params) => ({ ...params, is_lease: false }));
    } else if (type === 'lease') {
      setIsLease(true);
      setParams((params) => ({ ...params, is_lease: true }));
    }
  }, [type, value]);

  const [posts, setPosts] = React.useState<{
    numOfPages: number;
    posts: RealEstatePost[];
  }>({ numOfPages: 1, posts: [] });

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

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
    setIsLoading(true);
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
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [params]);

  return (
    <Stack>
      <HeaderSearch
        onFilterButtonClick={(params) => {
          setParams(params);
        }}
      />
      <ItemSearch
        isLoading={isLoading}
        posts={posts.posts}
        numOfPages={posts.numOfPages}
        onPageChange={(page) => {
          setParams((params) => ({ ...params, page: page }));
        }}
        isLease={isLease}
        onIsLeaseChange={(isLease: boolean) => {
          setIsLease(isLease);
          setParams((params) => ({ ...params, is_lease: isLease }));
        }}
      />
    </Stack>
  );
}
