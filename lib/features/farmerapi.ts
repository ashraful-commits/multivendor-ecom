// lib/redux/features/FarmerApi.ts
import { api } from './AllApi';
import { farmerData } from '../../typescript';

// Define the tag types
type FarmerTag = { type: 'Farmer'; id?: string };

export const FarmerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFarmer: builder.query<farmerData[], void>({
      query: () => 'farmers',
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: 'Farmer', id } as const))
          : [{ type: 'Farmer' }],
    }),
    addNewFarmer: builder.mutation<farmerData, Partial<farmerData>>({
      query: (newFarmer) => ({
        url: 'farmers',
        method: 'POST',
        body: newFarmer,
      }),
      invalidatesTags: [{ type: 'Farmer' }],
    }),
    editFarmer: builder.mutation<farmerData, Partial<farmerData>>({
      query: (Farmer) => ({
        url: `farmers/${Farmer.id}`,
        method: 'PATCH',
        body: Farmer,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Farmer', id }],
    }),
  }),
  
});

export const { useGetFarmerQuery, useAddNewFarmerMutation, useEditFarmerMutation } = FarmerApi;
