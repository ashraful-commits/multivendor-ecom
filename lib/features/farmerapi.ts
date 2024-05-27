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
    getSingleFarmer: builder.query<farmerData, string>({
      query: (id) => `farmers/${id}`,
      providesTags: (result, error, id) =>
        result ? [{ type: 'Farmer', id }] : [{ type: 'Farmer' }],
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
      query: (farmer) => ({
        url: `farmers/${farmer.id}`,
        method: 'PUT',
        body: farmer,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Farmer', id }],
    }),
    deleteFarmer: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `farmers/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Farmer', id }],
    }),
  }),
});

export const {
  useGetFarmerQuery,
  useGetSingleFarmerQuery,
  useAddNewFarmerMutation,
  useEditFarmerMutation,
  useDeleteFarmerMutation,
} = FarmerApi;
