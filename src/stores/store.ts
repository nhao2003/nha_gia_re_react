import { configureStore } from '@reduxjs/toolkit'
import { authApiSlice } from '../features/authApiSlice'
import authReducer from '../features/authSlice'


export const store = configureStore({
  reducer: {
    // Add the generated authApi reducer to the store
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(authApiSlice.middleware)
  },
  devTools: true,
})
