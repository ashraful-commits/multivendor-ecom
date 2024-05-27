// lib/redux/features/ReviewApi.ts
import { api } from './AllApi';
import { ReviewData } from '../../typescript';

// Define the Review types
type Review = { type: 'Review'; id?: string };

export const ReviewApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getReview: builder.query<ReviewData[], string>({
      query: (id) => `reviews/${id}`,
      providesTags: ['Review'],
    }),
    getSingleReview: builder.query<ReviewData[], { rate: number, id: string }>({
      query: ({ rate, id }) => `reviews/rate/${rate}/${id}`,
      providesTags: ['Review'],
    }),
    addNewReview: builder.mutation<ReviewData, Partial<ReviewData>>({
      query: (newReview) => ({
        url: 'reviews',
        method: 'POST',
        body: newReview,
      }),
      invalidatesTags: ['Review'],
    }),
    editReview: builder.mutation<ReviewData, Partial<ReviewData>>({
      query: ({ id, ...Review }) => ({
        url: `reviews/${id}`,
        method: 'PUT',
        body: Review,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Review', id }],
    }),
  }),
});

export const { useGetReviewQuery, useGetSingleReviewQuery, useAddNewReviewMutation, useEditReviewMutation } = ReviewApi;
