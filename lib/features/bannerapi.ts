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
        method: 'PATCH',
        body: banner,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Banner', id }],
    }),
  }),
});

export const { useGetBannerQuery, useAddNewBannerMutation, useEditBannerMutation } = BannerApi;
