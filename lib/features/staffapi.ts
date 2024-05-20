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
        method: 'PATCH',
        body: Staff,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Staff', id }],
    }),
  }),
  
});

export const { useGetStaffQuery, useAddNewStaffMutation, useEditStaffMutation } = StaffApi;
