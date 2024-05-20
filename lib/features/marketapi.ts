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
    addNewMarket: builder.mutation<marketData, Partial<marketData>>({
      query: (newMarket) => ({
        url: 'markets',
        method: 'POST',
        body: newMarket,
      }),
      invalidatesTags: [{ type: 'Market' }],
    }),
    editMarket: builder.mutation<marketData, Partial<marketData>>({
      query: (Market) => ({
        url: `markets/${Market.id}`,
        method: 'PATCH',
        body: Market,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Market', id }],
    }),
  }),
  
});

export const { useGetMarketQuery, useAddNewMarketMutation, useEditMarketMutation } = MarketApi;
