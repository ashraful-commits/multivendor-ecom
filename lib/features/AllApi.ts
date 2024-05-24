
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const api = createApi({
  reducerPath: "Api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
  }),
  tagTypes: ['Review','Payment','Order','Favorite','Banner','Brand','Category','Community','Coupon','Customer','Farmer','Market','Product','Staff','Tag','Cart','User'],
  endpoints: () => ({}),
})