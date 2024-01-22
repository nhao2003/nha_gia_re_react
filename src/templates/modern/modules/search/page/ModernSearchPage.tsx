import { Stack } from '@mui/material';
import { ModernHeaderSearch } from '../component/ModernHeaderSearch';
import { ModernItemSearch } from '../component/ModernItemSearch';
import { ApiServiceBuilder } from '../../../../../services/api.service';
import { getParsedParams } from '../../../../../services/paramsSearch';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type RealEstatePost from '../../../../../models/RealEstatePost';

export function ModernSearchPage(): JSX.Element {
  const type = useLocation().pathname.split('/')[2];
  const [value, setValue] = React.useState<string>(useLocation().state as string);

  console.log('TYPE', type);
  console.log('VALUE', value);

  const [params, setParams] = React.useState({});
  const [isLease, setIsLease] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

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

  const navigate = useNavigate();

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

  React.useEffect(() => {
    console.log('params', getParsedParams(params));
    console.log('sanggg', params);
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
      <ModernHeaderSearch
        onFilterButtonClick={(params) => {
          setParams(params);
        }}
      />
      <ModernItemSearch
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
