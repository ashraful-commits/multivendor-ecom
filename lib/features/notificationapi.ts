// lib/redux/features/notificationApi.ts

import { notificationData } from '../../typescript';
import { api } from './AllApi';

// Define the tag types
type notificationTag = { type: 'Notification'; id?: string };

export const notificationApi = api.injectEndpoints({

  endpoints: (builder) => ({
    getNotification: builder.query<notificationData[], string>({
      query: (id) => `notifications/${id}`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: 'Notification', id } as const))
          : [{ type: 'Notification' }],
    }),
    addNewNotification: builder.mutation<notificationData, Partial<notificationData>>({
      query: (newNotification) => ({
        url: 'notifications',
        method: 'POST',
        body: newNotification,
      }),
      invalidatesTags: [{ type: 'Notification' }],
    }),
    editNotification: builder.mutation<notificationData, Partial<notificationData>>({
      query: (notification) => ({
        url: `notifications/${notification.id}`,
        method: 'PUT',
        body: {notification},
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Notification', id }],
    }),
    deleteNotification: builder.mutation<void, string>({
      query: (id) => ({
        url: `notifications/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Notification', id }],
    }),
    deleteMultiNotification: builder.mutation<notificationData, string[]>({
      query: (ids) => ({
        url: `notifications`,
        method: 'DELETE',
        body: { ids }, // send the IDs in the body
      }),
      invalidatesTags: (result, error, ids) =>
        (ids as string[]).map((id) => ({ type: 'Notification', id })),
    }),
  }),
});

export const { useGetNotificationQuery, useAddNewNotificationMutation,useDeleteNotificationMutation, useEditNotificationMutation ,useDeleteMultiNotificationMutation} = notificationApi;
