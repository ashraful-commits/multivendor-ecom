// lib/redux/features/CartApi.ts

import { cartData } from '../../typescript';
import { api } from './AllApi';

// Define the tag types
type CartTag = { type: 'Cart'; id?: string };

export const CartApi = api.injectEndpoints({

  endpoints: (builder) => ({
    getCart: builder.query<cartData[], void>({
      query: (id) => `carts/${id}`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: 'Cart', id } as const))
          : [{ type: 'Cart' }],
    }),
    addNewCart: builder.mutation<cartData, Partial<cartData>>({
      query: (newCart) => ({
        url: 'carts',
        method: 'POST',
        body: newCart,
      }),
      invalidatesTags: [{ type: 'Cart' }],
    }),
    editCart: builder.mutation<cartData, Partial<cartData>>({
      query: (Cart) => ({
        url: `carts/${Cart.id}`,
        method: 'PATCH',
        body: Cart,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Cart', id }],
    }),
  }),
});

export const { useGetCartQuery, useAddNewCartMutation, useEditCartMutation } = CartApi;
