// lib/redux/features/CategoryApi.ts
import { api } from './AllApi';
import { CategoryData } from '../../typescript';

// Define the tag types
type CategoryTag = { type: 'Category'; id?: string };

export const CategoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query<CategoryData[], void>({
      query: () => 'categories',
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: 'Category', id } as const))
          : [{ type: 'Category' }],
    }),
    getSingleCategory: builder.query<CategoryData, string>({
      query: (id) => `categories/${id}`,
      providesTags: (result, error, id) =>
        result ? [{ type: 'Category', id }] : [{ type: 'Category' }],
    }),
    addNewCategory: builder.mutation<CategoryData, Partial<CategoryData>>({
      query: (newCategory) => ({
        url: 'categories',
        method: 'POST',
        body: newCategory,
      }),
      invalidatesTags: [{ type: 'Category' }],
    }),
    editCategory: builder.mutation<CategoryData, Partial<CategoryData>>({
      query: (category) => ({
        url: `categories/${category.id}`,
        method: 'PUT',
        body: category,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Category', id }],
    }),
    deleteCategory: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Category', id }],
    }),
    deleteMultiCategory: builder.mutation<CategoryData, string[]>({
      query: (ids) => ({
        url: `categories`,
        method: 'DELETE',
        body: { ids }, // send the IDs in the body
      }),
      invalidatesTags: (result, error, ids) =>
        (ids as string[]).map((id) => ({ type: 'Category',id })),
    }),
    addNewMultiCategory: builder.mutation<CategoryData[], Partial<CategoryData[]>>({
      query: (data) => ({
        url: `categories/bulk/`,
        method: 'POST',
        body: { data }, 
      }),
      invalidatesTags: (result, error, ids) =>
        ids.map((category) => ({ type: 'Category', id:category?.id })),
    }),
  }),
});

export const {
  useGetCategoryQuery,
  useGetSingleCategoryQuery,
  useAddNewCategoryMutation,
  useAddNewMultiCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
  useDeleteMultiCategoryMutation,
} = CategoryApi;
