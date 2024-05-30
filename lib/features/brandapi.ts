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
    getSingleBrand: builder.query<brandData, string>({
      query: (id) => `brands/${id}`,
      providesTags: (result, error, id) =>
        result ? [{ type: 'Brand', id }] : [{ type: 'Brand' }],
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
      query: (brand) => ({
        url: `brands/${brand.id}`,
        method: 'PUT',
        body: brand,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Brand', id }],
    }),
    deleteBrand: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `brands/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Brand', id }],
    }),
    deleteMultiBrand: builder.mutation<brandData, string[]>({
      query: (ids) => ({
        url: `brands`,
        method: 'DELETE',
        body: { ids }, // send the IDs in the body
      }),
      invalidatesTags: (result, error, ids) =>
        (ids as string[]).map((id) => ({ type: 'Brand', id })),
    }),
    addNewMultiBrand: builder.mutation<brandData[], Partial<brandData[]>>({
      query: (data) => ({
        url: `brands/bulk/`,
        method: 'POST',
        body: { data }, 
      }),
      invalidatesTags: (result, error, ids) =>
        (ids as brandData[]).map((brand) => ({ type: 'Brand', id:brand?.id })),
    }),
  }),
});

export const {
  useGetBrandQuery,
  useGetSingleBrandQuery,
  useAddNewBrandMutation,
  useAddNewMultiBrandMutation,
  useEditBrandMutation,
  useDeleteBrandMutation,
  useDeleteMultiBrandMutation,
} = BrandApi;
