// lib/redux/features/PaymentApi.ts

import { PaymentData } from '../../typescript';
import { api } from './AllApi';

// Define the tag types
type PaymentTag = { type: 'Payment'; id?: string };

export const PaymentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addNewPayment: builder.mutation<PaymentData, Partial<PaymentData>>({
      query: (newPayment) => ({
        url: 'payments',
        method: 'POST',
        body: newPayment,
      }),
      invalidatesTags: [{ type: 'Payment' }],
    }),
  }),
});

export const { useAddNewPaymentMutation } = PaymentApi;
