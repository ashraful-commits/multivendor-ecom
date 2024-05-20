// lib/redux/features/CouponApi.ts
import { api } from './AllApi';
import { CouponData } from '../../typescript';

// Define the tag types
type CouponTag = { type: 'Coupon'; id?: string };

export const CouponApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCoupon: builder.query<CouponData[], void>({
      query: () => 'coupons',
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: 'Coupon', id } as const))
          : [{ type: 'Coupon' }],
    }),
    addNewCoupon: builder.mutation<CouponData, Partial<CouponData>>({
      query: (newCoupon) => ({
        url: 'coupons',
        method: 'POST',
        body: newCoupon,
      }),
      invalidatesTags: [{ type: 'Coupon' }],
    }),
    editCoupon: builder.mutation<CouponData, Partial<CouponData>>({
      query: (Coupon) => ({
        url: `coupons/${Coupon.id}`,
        method: 'PATCH',
        body: Coupon,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Coupon', id }],
    }),
  }),

});

export const { useGetCouponQuery, useAddNewCouponMutation, useEditCouponMutation } = CouponApi;
