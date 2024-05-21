
import { FavoriteData } from '../../typescript';
import { api } from './AllApi';

// Define the tag types
type FavoriteTag = { type: 'Favorite'; id?: string };

export const favoriteApi = api.injectEndpoints({

  endpoints: (builder) => ({
    getFavorite: builder.query<FavoriteData[], string>({
      query: (id) => `favorites/${id}`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: 'Favorite', id } as const))
          : [{ type: 'Favorite' }],
    }),
    addNewFavorite: builder.mutation<FavoriteData, Partial<FavoriteData>>({
      query: (newFavorite) => ({
        url: 'favorites',
        method: 'POST',
        body: newFavorite,
      }),
      invalidatesTags: [{ type: 'Favorite' }],
    }),
    deleteFavorite: builder.mutation<void, string>({
      query: (id) => ({
        url: `favorites/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Favorite', id }],
    }),
  }),
});

export const { useGetFavoriteQuery, useAddNewFavoriteMutation,useDeleteFavoriteMutation } = favoriteApi;
