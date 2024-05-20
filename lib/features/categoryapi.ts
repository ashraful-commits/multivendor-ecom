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
    addNewCategory: builder.mutation<CategoryData, Partial<CategoryData>>({
      query: (newCategory) => ({
        url: 'categories',
        method: 'POST',
        body: newCategory,
      }),
      invalidatesTags: [{ type: 'Category' }],
    }),
    editCategory: builder.mutation<CategoryData, Partial<CategoryData>>({
      query: (Category) => ({
        url: `categories/${Category.id}`,
        method: 'PATCH',
        body: Category,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Category', id }],
    }),
  }),

});

export const { useGetCategoryQuery, useAddNewCategoryMutation, useEditCategoryMutation } = CategoryApi;
