import { baseApi } from "../../API/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: ({ keyword = "", status = "" }) => {
        let queryParams = `?keyword=${keyword}`;
        if (status !== "") {
          queryParams += `&status=${status}`;
        }

        return {
          url: `/order${queryParams}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["order"],
    }),

    getSingleOrderById: builder.query({
      query: (id) => {
        return {
          url: `/order/${id}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["order"],
    }),

    getOrdersByShopId: builder.query({
      query: (id) => {
        return {
          url: `/order/shop/${id}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["order"],
    }),

    createOrder: builder.mutation({
      query: (data) => ({
        url: "/order/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["order"],
    }),

    updateOrder: builder.mutation({
      query: ({ id, data }) => ({
        url: `/order/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["order"],
    }),

    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/order/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["order"],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetSingleOrderByIdQuery,
  useGetOrdersByShopIdQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = orderApi;
