// lib/redux/features/ProductApi.ts
import { api } from "./AllApi";
import { ProductData } from "../../typescript";

// Define the tag types
type ProductTag = { type: "Product"; id?: string };

export const ProductApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFilterProduct: builder.query<ProductData[], { search: string; category: string; brand: string; minPrice: number; maxPrice: number; tag:string[] }>({
      query: (filter) =>
        `products?search=${filter.search}&maxPrice=${filter.maxPrice}&minPrice=${filter.minPrice}&category=${filter.category}&brand=${filter.brand}&tag=${filter.tag}`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: 'Product', id } as const))
          : [{ type: 'Product' }],
    }),
    getProduct: builder.query<ProductData[], void>({
      query: () => `products`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "Product", id } as const))
          : [{ type: "Product" }],
    }),
    getSingleProduct: builder.query<ProductData, string>({
      query: (id) => `products/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),
    getCatProduct: builder.query<ProductData[], string>({
      query: (catId) => `products/category/${catId}`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "Product", id } as const))
          : [{ type: "Product" }],
    }),
    addNewProduct: builder.mutation<ProductData, Partial<ProductData>>({
      query: (newProduct) => ({
        url: "products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: [{ type: "Product" }],
    }),
    editProduct: builder.mutation<ProductData, Partial<ProductData>>({
      query: (Product) => ({
        url: `products/${Product.id}`,
        method: "PUT",
        body: Product,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Product", id }],
    }),
    deleteProduct: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Product", id }],
    }),
    deleteMultiProduct: builder.mutation<ProductData, string[]>({
      query: (ids) => ({
        url: `products`,
        method: 'DELETE',
        body: { ids }, // send the IDs in the body
      }),
      invalidatesTags: (result, error, ids) =>
        (ids as string[]).map((id) => ({ type: 'Product', id })),
    }),
    addNewMultiProduct: builder.mutation<ProductData[], Partial<ProductData[]>>({
      query: (data) => ({
        url: `products/bulk/`,
        method: 'POST',
        body: { data }, 
      }),
      invalidatesTags: (result, error, ids) =>
        ids.map((product) => ({ type: 'Product', id:product?.id })),
    }),
  }),
});

export const {
  useGetProductQuery,
  useGetFilterProductQuery,
  useGetSingleProductQuery,
  useAddNewProductMutation,
  useAddNewMultiProductMutation,
  useEditProductMutation,
  useGetCatProductQuery,
  useDeleteProductMutation ,
  useDeleteMultiProductMutation 
} = ProductApi;
