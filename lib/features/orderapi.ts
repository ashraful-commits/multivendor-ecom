// lib/redux/features/OrderApi.ts

import { orderData } from '../../typescript';
import { api } from './AllApi';

// Define the tag types
type OrderTag = { type: 'Order'; id?: string };

export const OrderApi = api.injectEndpoints({

  endpoints: (builder) => ({
    getOrder: builder.query<orderData[], string>({
      query: (id) => `orders/${id}`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: 'Order', id } as const))
          : [{ type: 'Order' }],
    }),
    addNewOrder: builder.mutation<orderData, Partial<orderData>>({
      query: (newOrder) => ({
        url: 'orders',
        method: 'POST',
        body: newOrder,
      }),
      invalidatesTags: [{ type: 'Order' }],
    }),
    editOrder: builder.mutation<orderData, Partial<orderData>>({
      query: (Order) => ({
        url: `orders/${Order.id}`,
        method: 'PUT',
        body: {quantity:Order.quantity,total:Order.total},
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Order', id }],
    }),
    deleteOrder: builder.mutation<void, string>({
      query: (id) => ({
        url: `orders/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Order', id }],
    }),
  }),
});

export const { useGetOrderQuery, useAddNewOrderMutation,useDeleteOrderMutation, useEditOrderMutation } = OrderApi;
