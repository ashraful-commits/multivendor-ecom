// lib/redux/features/CouponApi.ts
import { api } from './AllApi';
import { couponData } from '../../typescript';

// Define the tag types
type CouponTag = { type: 'Coupon'; id?: string };

export const CouponApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCoupon: builder.query<couponData[], void>({
      query: () => 'coupons',
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: 'Coupon', id } as const))
          : [{ type: 'Coupon' }],
    }),
    getSingleCoupon: builder.query<couponData, string>({
      query: (id) => `coupons/${id}`,
      providesTags: (result, error, id) =>
        result ? [{ type: 'Coupon', id }] : [{ type: 'Coupon' }],
    }),
    addNewCoupon: builder.mutation<couponData, Partial<couponData>>({
      query: (newCoupon) => ({
        url: 'coupons',
        method: 'POST',
        body: newCoupon,
      }),
      invalidatesTags: [{ type: 'Coupon' }],
    }),
    editCoupon: builder.mutation<couponData, Partial<couponData>>({
      query: (coupon) => ({
        url: `coupons/${coupon.id}`,
        method: 'PUT',
        body: coupon,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Coupon', id }],
    }),
    deleteCoupon: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `coupons/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Coupon', id }],
    }),
    deleteMultiCoupon: builder.mutation<couponData, string[]>({
      query: (ids) => ({
        url: `coupons`,
        method: 'DELETE',
        body: { ids }, // send the IDs in the body
      }),
      invalidatesTags: (result, error, ids) =>
        (ids as string[]).map((id) => ({ type: 'Coupon', id })),
    }),
    addNewMultiCoupon: builder.mutation<couponData[], Partial<couponData[]>>({
      query: (data) => ({
        url: `coupons/bulk/`,
        method: 'POST',
        body: { data }, 
      }),
      invalidatesTags: (result, error, ids) =>
        ids.map((coupon) => ({ type: 'Coupon', id:coupon?.id })),
    }),
  }),

});

export const {
  useGetCouponQuery,
  useGetSingleCouponQuery,
  useAddNewCouponMutation,
  useAddNewMultiCouponMutation,
  useEditCouponMutation,
  useDeleteCouponMutation,
  useDeleteMultiCouponMutation,
} = CouponApi;
