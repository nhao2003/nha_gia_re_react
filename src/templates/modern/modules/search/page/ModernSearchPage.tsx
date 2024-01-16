import { Stack } from '@mui/material';
import { ModernHeaderSearch } from '../component/ModernHeaderSearch';
import { ModernItemSearch } from '../component/ModernItemSearch';
import { ApiServiceBuilder } from '../../../../../services/api.service';
import { getParsedParams } from '../../../../../services/paramsSearch';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export function ModernSearchPage(): JSX.Element {
  // const [params, setParams] = React.useState<URLSearchParams>(new URLSearchParams(window.location.search));
  async function fetchPosts() {
    const params = new URLSearchParams(window.location.search);
    console.log('GET PARAMS', getParsedParams(params));
    const query = new ApiServiceBuilder()
      .withUrl('/posts')
      .withParams(getParsedParams(params))
      .build();
    const response = await query.get();
    return response.data as any;
  }

  const [posts, setPosts] = React.useState<any[]>([]);
  const [numOfPages, setNumOfPages] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const navigate = useNavigate();
  React.useEffect(() => {    
    setIsLoading(true);
    fetchPosts()
    .then((data) => {
      setPosts(data.result);
      setNumOfPages(data.num_of_pages);
      console.log(data);  
    })
    .catch((error) => {
      console.log(error);
    }).finally(() => {
      setIsLoading(false);
    });
  }, [location.search]);



  const [isLease, setIsLease] = React.useState(true);

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
        posts={posts}
        numOfPages={numOfPages}
        isLease={isLease}
        onIsLeaseChange={(isLease) => {
          setIsLease(isLease);
          const newParams = new URLSearchParams(window.location.search);
          newParams.set('is_lease', isLease ? 'true' : 'false');
          navigate('/search?' + newParams.toString());
        }
        }
        isLoading={isLoading}
      
      />
    </Stack>
  );
}
