// lib/redux/features/CommunityApi.ts
import { api } from './AllApi';
import { communityData } from '../../typescript';

// Define the tag types
type CommunityTag = { type: 'Community'; id?: string };

export const CommunityApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCommunity: builder.query<communityData[], void>({
      query: () => 'communities',
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: 'Community', id } as const))
          : [{ type: 'Community' }],
    }),
    getSingleCommunity: builder.query<communityData, string>({
      query: (id) => `communities/${id}`,
      providesTags: (result, error, id) =>
        result ? [{ type: 'Community', id }] : [{ type: 'Community' }],
    }),
    addNewCommunity: builder.mutation<communityData, Partial<communityData>>({
      query: (newCommunity) => ({
        url: 'communities',
        method: 'POST',
        body: newCommunity,
      }),
      invalidatesTags: [{ type: 'Community' }],
    }),
    editCommunity: builder.mutation<communityData, Partial<communityData>>({
      query: (community) => ({
        url: `communities/${community.id}`,
        method: 'PUT',
        body: community,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Community', id }],
    }),
    deleteCommunity: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `communities/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Community', id }],
    }),
    deleteMultiCommunity: builder.mutation<communityData, string[]>({
      query: (ids) => ({
        url: `communities`,
        method: 'DELETE',
        body: { ids }, // send the IDs in the body
      }),
      invalidatesTags: (result, error, ids) =>
       ( ids as string[]).map((id) => ({ type: 'Community', id })),
    }),
    addNewMultiCommunity : builder.mutation<communityData[],  Partial<communityData[]>>({
      query: (data) => ({
        url: `communities/bulk/`,
        method: 'POST',
        body: { data },
      }),
      invalidatesTags: (result, error, ids) =>
        (ids as communityData[]).map((community) => ({ type: 'Community', id:community?.id })),
    }),
  }),

});

export const {
  useGetCommunityQuery,
  useGetSingleCommunityQuery,
  useAddNewCommunityMutation,
  useAddNewMultiCommunityMutation,
  useEditCommunityMutation,
  useDeleteCommunityMutation,
  useDeleteMultiCommunityMutation,
} = CommunityApi;
