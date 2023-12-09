import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logout } from '../features/authSlice'

interface RootState {
  auth: {
    token: string | null
    // other auth-related properties if any
  }
  // other slices' state
}

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3000',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token
    if (token != null) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
})

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result?.error?.status === 403) {
    console.log('reauth')
    const refreshResult = await baseQuery('/refresh', api, extraOptions)
    console.log('refreshResult', refreshResult)
    if (refreshResult?.data != null) {
      const user = api.getState().auth.user
      api.dispatch(setCredentials({ ...refreshResult.data, user }))
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logout())
    }
  }
  return result
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // define all your endpoints here
  }),
})
