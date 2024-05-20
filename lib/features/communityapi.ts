// lib/redux/features/CommunityApi.ts
import { api } from './AllApi';
import { CommunityData } from '../../typescript';

// Define the tag types
type CommunityTag = { type: 'Community'; id?: string };

export const CommunityApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCommunity: builder.query<CommunityData[], void>({
      query: () => 'communities',
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: 'Community', id } as const))
          : [{ type: 'Community' }],
    }),
    addNewCommunity: builder.mutation<CommunityData, Partial<CommunityData>>({
      query: (newCommunity) => ({
        url: 'communities',
        method: 'POST',
        body: newCommunity,
      }),
      invalidatesTags: [{ type: 'Community' }],
    }),
    editCommunity: builder.mutation<CommunityData, Partial<CommunityData>>({
      query: (Community) => ({
        url: `communities/${Community.id}`,
        method: 'PATCH',
        body: Community,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Community', id }],
    }),
  }),
 
});

export const { useGetCommunityQuery, useAddNewCommunityMutation, useEditCommunityMutation } = CommunityApi;
