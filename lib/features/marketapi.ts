// lib/redux/features/MarketApi.ts
import { api } from './AllApi';
import { marketData } from '../../typescript';

// Define the tag types
type MarketTag = { type: 'Market'; id?: string };

export const MarketApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMarket: builder.query<marketData[], void>({
      query: () => 'markets',
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: 'Market', id } as const))
          : [{ type: 'Market' }],
    }),
    getSingleMarket: builder.query<marketData, string>({
      query: (id) => `markets/${id}`,
      providesTags: (result, error, id) =>
        result ? [{ type: 'Market', id }] : [{ type: 'Market' }],
    }),
    addNewMarket: builder.mutation<marketData, Partial<marketData>>({
      query: (newMarket) => ({
        url: 'markets',
        method: 'POST',
        body: newMarket,
      }),
      invalidatesTags: [{ type: 'Market' }],
    }),
    editMarket: builder.mutation<marketData, Partial<marketData>>({
      query: (market) => ({
        url: `markets/${market.id}`,
        method: 'PUT',
        body: market,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Market', id }],
    }),
    deleteMarket: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `markets/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Market', id }],
    }),
    deleteMultiMarket: builder.mutation<marketData, string[]>({
      query: (ids) => ({
        url: `markets`,
        method: 'DELETE',
        body: { ids }, // send the IDs in the body
      }),
      invalidatesTags: (result, error, ids) =>
        (ids as string[]).map((id) => ({ type: 'Market', id })),
    }),
    addNewMultiMarket: builder.mutation<marketData[], Partial<marketData[]>>({
      query: (data) => ({
        url: `markets/bulk/`,
        method: 'POST',
        body: { data }, 
      }),
      invalidatesTags: (result, error, ids) =>
        ids.map((tag) => ({ type: 'Market', id:tag?.id })),
    }),
  }),
});

export const {
  useGetMarketQuery,
  useGetSingleMarketQuery,
  useAddNewMarketMutation,
  useAddNewMultiMarketMutation,
  useEditMarketMutation,
  useDeleteMarketMutation,
  useDeleteMultiMarketMutation,
} = MarketApi;
