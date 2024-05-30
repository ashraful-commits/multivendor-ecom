import { configureStore } from '@reduxjs/toolkit';
import { api } from './features/AllApi';
import checkoutReducer from './features/stepSlice'; // Assuming checkoutSlice exports the reducer function, not the slice
import filterReducer from './features/filterSlice'; // Assuming checkoutSlice exports the reducer function, not the slice
import bulkSlice from './features/bulkSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    checkout: checkoutReducer, 
    filter: filterReducer, 
    bulk: bulkSlice, 
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
