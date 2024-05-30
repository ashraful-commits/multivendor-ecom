// lib/redux/features/StaffApi.ts
import { api } from './AllApi';
import { staffData } from '../../typescript';

// Define the tag types
type StaffTag = { type: 'Staff'; id?: string };

export const StaffApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getStaff: builder.query<staffData[], void>({
      query: () => 'staffs',
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: 'Staff', id } as const))
          : [{ type: 'Staff' }],
    }),
    addNewStaff: builder.mutation<staffData, Partial<staffData>>({
      query: (newStaff) => ({
        url: 'staffs',
        method: 'POST',
        body: newStaff,
      }),
      invalidatesTags: [{ type: 'Staff' }],
    }),
    editStaff: builder.mutation<staffData, Partial<staffData>>({
      query: (Staff) => ({
        url: `staffs/${Staff.id}`,
        method: 'PUT',
        body: Staff,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Staff', id }],
    }),
    deleteStaff: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `staffs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Staff', id }],
    }),
    getSingleStaff: builder.query<staffData, string>({
      query: (id) => `staffs/${id}`,
      providesTags: (result, error, id) => [{ type: 'Staff', id }],
    }),
    deleteMultiStaff: builder.mutation<staffData, string[]>({
      query: (ids) => ({
        url: `staffs`,
        method: 'DELETE',
        body: { ids }, // send the IDs in the body
      }),
      invalidatesTags: (result, error, ids) =>
        (ids as string[]).map((id) => ({ type: 'Staff', id })),
    }),
    addNewMultiStaff: builder.mutation<staffData[], Partial<staffData[]>>({
      query: (data) => ({
        url: `staffs/bulk/`,
        method: 'POST',
        body: { data }, 
      }),
      invalidatesTags: (result, error, ids) =>
        (ids as staffData[]).map((staff) => ({ type: 'Staff', id:staff?.id })),
    }),
  }),
});

export const {
  useGetStaffQuery,
  useAddNewStaffMutation,
  useAddNewMultiStaffMutation,
  useEditStaffMutation,
  useDeleteStaffMutation,
  useDeleteMultiStaffMutation,
  useGetSingleStaffQuery, 
} = StaffApi;
