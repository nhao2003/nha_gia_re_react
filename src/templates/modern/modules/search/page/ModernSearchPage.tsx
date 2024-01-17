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
    const params = new URLSearchParams(window.location.search);
    console.log('GET PARAMS', getParsedParams(params));
    const query = new ApiServiceBuilder().withUrl('/posts').withParams(getParsedParams(params)).build();
    const response = await query.get();
    return response.data as any;
  }

  const [posts, setPosts] = React.useState<any[]>([]);
  const [numOfPages, setNumOfPages] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const navigate = useNavigate();
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
        onFilterButtonClick={(filterParams) => {
          const newParams = new URLSearchParams(window.location.search);
          filterParams.forEach((value, key) => {
            newParams.set(key, value);
          });
          navigate('/search?' + newParams.toString());
        }}
      />
      <ModernItemSearch
        posts={posts.posts}
        numOfPages={posts.numOfPages}
        onPageChange={(page) => {
          setParams((params) => ({ ...params, page: page }));
        }}
      />
    </Stack>
  );
}
