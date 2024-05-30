// lib/redux/features/CustomerApi.ts
import { api } from './AllApi';
import { customerData } from '../../typescript';

// Define the tag types
type CustomerTag = { type: 'Customer'; id?: string };

export const CustomerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCustomer: builder.query<customerData[], void>({
      query: () => 'customers',
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: 'Customer', id } as const))
          : [{ type: 'Customer' }],
    }),
    getSingleCustomer: builder.query<customerData, string>({
      query: (id) => `customers/${id}`,
      providesTags: (result, error, id) =>
        result ? [{ type: 'Customer', id }] : [{ type: 'Customer' }],
    }),
    addNewCustomer: builder.mutation<customerData, Partial<customerData>>({
      query: (newCustomer) => ({
        url: 'customers',
        method: 'POST',
        body: newCustomer,
      }),
      invalidatesTags: [{ type: 'Customer' }],
    }),
    editCustomer: builder.mutation<customerData, Partial<customerData>>({
      query: (customer) => ({
        url: `customers/${customer.id}`,
        method: 'PUT',
        body: customer,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Customer', id }],
    }),
    deleteCustomer: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `customers/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Customer', id }],
    }),
    deleteMultiCustomer: builder.mutation<customerData, string[]>({
      query: (ids) => ({
        url: `customers`,
        method: 'DELETE',
        body: { ids }, // send the IDs in the body
      }),
      invalidatesTags: (result, error, ids) =>
        (ids as string[]).map((id) => ({ type: 'Customer',id })),
    }),
    addNewMultiCustomer: builder.mutation<customerData[], Partial<customerData[]>>({
      query: (data) => ({
        url: `customers/bulk/`,
        method: 'POST',
        body: { data }, 
      }),
      invalidatesTags: (result, error, ids) =>
        ids.map((customer) => ({ type: 'Customer', id:customer?.id })),
    }),
  }),
});

export const {
  useGetCustomerQuery,
  useGetSingleCustomerQuery,
  useAddNewCustomerMutation,
  useAddNewMultiCustomerMutation,
  useEditCustomerMutation,
  useDeleteCustomerMutation,
  useDeleteMultiCustomerMutation
} = CustomerApi;
