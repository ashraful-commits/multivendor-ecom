// lib/redux/features/BrandApi.ts
import { api } from './AllApi';
import { brandData } from '../../typescript';

// Define the tag types
type BrandTag = { type: 'Brand'; id?: string };

export const BrandApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBrand: builder.query<brandData[], void>({
      query: () => 'brands',
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: 'Brand', id } as const))
          : [{ type: 'Brand' }],
    }),
    addNewBrand: builder.mutation<brandData, Partial<brandData>>({
      query: (newBrand) => ({
        url: 'brands',
        method: 'POST',
        body: newBrand,
      }),
      invalidatesTags: [{ type: 'Brand' }],
    }),
    editBrand: builder.mutation<brandData, Partial<brandData>>({
      query: (Brand) => ({
        url: `brands/${Brand.id}`,
        method: 'PATCH',
        body: Brand,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Brand', id }],
    }),
  }),
  
});

export const { useGetBrandQuery, useAddNewBrandMutation, useEditBrandMutation } = BrandApi;
