import { orderData } from '../../typescript';
import { api } from './AllApi';

// Define the tag types
type OrderTag = { type: 'Order'; id?: string };

export const OrderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getOrder: builder.query<orderData[], void>({
      query: () => `orders`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: 'Order', id } as const))
          : [{ type: 'Order' }],
    }),
    getSingleOrder: builder.query<orderData, string>({
      query: (id) => `orders/${id}`,
      providesTags: (result, error, id) => [{ type: 'Order', id }],
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
        body: { status: Order.status },
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
    getTodayOrders: builder.query<orderData[], void>({
      query: () => `orders/today`,
      providesTags: [{ type: 'Order', id: 'TODAY' }],
    }),
    getYesterdayOrders: builder.query<orderData[], void>({
      query: () => `orders/yesterday`,
      providesTags: [{ type: 'Order', id: 'YESTERDAY' }],
    }),
    getThisMonthOrders: builder.query<orderData[], void>({
      query: () => `orders/month`,
      providesTags: [{ type: 'Order', id: 'MONTH' }],
    }),
    getLastMonthOrders: builder.query<orderData[], void>({
      query: () => `orders/lastmonth`,
      providesTags: [{ type: 'Order', id: 'LAST_MONTH' }],
    }),
    getAllTimeSales: builder.query<orderData[], void>({
      query: () => `orders/alltime`,
      providesTags: [{ type: 'Order', id: 'ALLTIME' }],
    }),
    getPendingOrders: builder.query<orderData[], void>({
      query: () => `orders/pending`,
      providesTags: [{ type: 'Order', id: 'PENDING' }],
    }),
    getProcessingOrders: builder.query<orderData[], void>({
      query: () => `orders/process`,
      providesTags: [{ type: 'Order', id: 'PROCESS' }],
    }),
    getDeliveredOrders: builder.query<orderData[], void>({
      query: () => `orders/complate`,
      providesTags: [{ type: 'Order', id: 'COMPLATE' }],
    }),
  }),
});

export const {
  useGetOrderQuery,
  useGetSingleOrderQuery,
  useAddNewOrderMutation,
  useDeleteOrderMutation,
  useEditOrderMutation,
  useGetTodayOrdersQuery,
  useGetYesterdayOrdersQuery,
  useGetThisMonthOrdersQuery,
  useGetLastMonthOrdersQuery,
  useGetAllTimeSalesQuery,
  useGetPendingOrdersQuery,
  useGetProcessingOrdersQuery,
  useGetDeliveredOrdersQuery,
} = OrderApi;
