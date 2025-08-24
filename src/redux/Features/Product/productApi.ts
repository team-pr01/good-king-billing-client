import { baseApi } from "../../API/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => {
        return {
          url: `/product`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["product"],
    }),

    getSingleProductById: builder.query({
      query: (id) => {
        return {
          url: `/product/${id}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["product"],
    }),

    addProduct: builder.mutation({
      query: (data) => ({
        url: "/product/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),

    updateProduct: builder.mutation({
      query: (data) => ({
        url: "/product/add",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
