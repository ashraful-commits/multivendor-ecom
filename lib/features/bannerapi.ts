// lib/redux/features/bannerApi.ts

import { bannerData } from '../../typescript';
import { api } from './AllApi';

// Define the tag types
type BannerTag = { type: 'Banner'; id?: string };

export const BannerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBanner: builder.query<bannerData[], void>({
      query: () => 'banners',
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: 'Banner', id } as const))
          : [{ type: 'Banner' }],
    }),
    getSingleBanner: builder.query<bannerData, string>({
      query: (id) => `banners/${id}`,
      providesTags: (result, error, id) =>
        result ? [{ type: 'Banner', id }] : [{ type: 'Banner' }],
    }),
    addNewBanner: builder.mutation<bannerData, Partial<bannerData>>({
      query: (newBanner) => ({
        url: 'banners',
        method: 'POST',
        body: newBanner,
      }),
      invalidatesTags: [{ type: 'Banner' }],
    }),
    editBanner: builder.mutation<bannerData, Partial<bannerData>>({
      query: (banner) => ({
        url: `banners/${banner.id}`,
        method: 'PUT',
        body: banner,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Banner', id }],
    }),
    deleteBanner: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `banners/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Banner', id }],
    }),
    deleteMultiBanner: builder.mutation<bannerData, string[]>({
      query: (ids) => ({
        url: `banners`,
        method: 'DELETE',
        body: { ids }, // send the IDs in the body
      }),
      invalidatesTags: (result, error, ids) =>
        (ids as string[]).map((id) => ({ type: 'Banner', id })),
    }),
    addNewMultiBanner:  builder.mutation<bannerData[], Partial<bannerData[]>>({
      query: (data) => ({
        url: `banners/bulk/`,
        method: 'POST',
        body: { data },
      }),
      invalidatesTags: (result, error, ids) =>
        (ids as bannerData[]).map((banner) => ({ type: 'Banner', id: banner?.id })),
    }),
  }),
});

export const {
  useGetBannerQuery,
  useGetSingleBannerQuery,
  useAddNewBannerMutation,
  useAddNewMultiBannerMutation,
  useEditBannerMutation,
  useDeleteBannerMutation,
  useDeleteMultiBannerMutation
} = BannerApi;
