// lib/redux/features/UserApi.ts
import { api } from './AllApi';
import { userData } from '../../typescript';

// Define the tag types
type UserTag = { type: 'User'; id?: string };

export const UserApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<userData[], void>({
      query: () => 'users',
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: 'User', id } as const))
          : [{ type: 'User' }],
    }),
    addNewUser: builder.mutation<userData, Partial<userData>>({
      query: (newUser) => ({
        url: 'users',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: [{ type: 'User' }],
    }),
    getSingleUser: builder.query<userData, string>({
      query: (email) => `users/${email}`,
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),
    getSingleUserById: builder.query<userData, string>({
      query: (id) => `users/user/${id}`,
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),
    editUser: builder.mutation<userData, Partial<userData>>({
      query: (User) => ({
        url: `users/${User?.email}`,
        method: 'PUT',
        body: User,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
    }),
    deleteUser: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'User', id }],
    }),
 
    
  }),
});

export const {
  useGetUserQuery,
  useAddNewUserMutation,
  useGetSingleUserQuery,
  useEditUserMutation,
  useDeleteUserMutation,
  useGetSingleUserByIdQuery
} = UserApi;
