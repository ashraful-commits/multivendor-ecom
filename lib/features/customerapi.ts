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
    addNewCustomer: builder.mutation<customerData, Partial<customerData>>({
      query: (newCustomer) => ({
        url: 'customers',
        method: 'POST',
        body: newCustomer,
      }),
      invalidatesTags: [{ type: 'Customer' }],
    }),
    editCustomer: builder.mutation<customerData, Partial<customerData>>({
      query: (Customer) => ({
        url: `customers/${Customer.id}`,
        method: 'PATCH',
        body: Customer,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Customer', id }],
    }),
  }),
  
});

export const { useGetCustomerQuery, useAddNewCustomerMutation, useEditCustomerMutation } = CustomerApi;
