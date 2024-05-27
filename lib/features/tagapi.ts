// lib/redux/features/TagApi.ts
import { api } from './AllApi';
import { TagData } from '../../typescript';

// Define the tag types
type TagTag = { type: 'Tag'; id?: string };

export const TagApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTag: builder.query<TagData[], void>({
      query: () => 'tags',
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: 'Tag', id } as const))
          : [{ type: 'Tag' }],
    }),
    getSingleTag: builder.query<TagData, string>({
      query: (id) => `tags/${id}`,
      providesTags: (result, error, id) =>
        result ? [{ type: 'Tag', id }] : [{ type: 'Tag' }],
    }),
    addNewTag: builder.mutation<TagData, Partial<TagData>>({
      query: (newTag) => ({
        url: 'tags',
        method: 'POST',
        body: newTag,
      }),
      invalidatesTags: [{ type: 'Tag' }],
    }),
    editTag: builder.mutation<TagData, Partial<TagData>>({
      query: (Tag) => ({
        url: `tags/${Tag.id}`,
        method: 'PUT',
        body: Tag,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Tag', id }],
    }),
    deleteTag: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `tags/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Tag', id }],
    }),
  }),
});

export const {
  useGetTagQuery,
  useGetSingleTagQuery,
  useAddNewTagMutation,
  useEditTagMutation,
  useDeleteTagMutation,
} = TagApi;
