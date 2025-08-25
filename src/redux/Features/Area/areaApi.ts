import { baseApi } from "../../API/baseApi";

const areaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
   getAllArea: builder.query({
  query: ({ keyword = "" }: { keyword?: string }) => {
    let url = `/area`;

    if (keyword && keyword.trim() !== "") {
      url += `?keyword=${encodeURIComponent(keyword)}`;
    }

    return {
      url,
      method: "GET",
      credentials: "include",
    };
  },
  providesTags: ["area"],
}),


    getSingleAreaById: builder.query({
      query: (id) => {
        return {
          url: `/area/${id}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["area"],
    }),

    addArea: builder.mutation({
      query: (data) => ({
        url: "/area/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["area"],
    }),

    updateArea: builder.mutation({
      query: ({id, data}) => ({
        url: `/area/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["area"],
    }),

    deleteArea: builder.mutation({
      query: (id) => ({
        url: `/area/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["area"],
    }),
  }),
});

export const {
  useGetAllAreaQuery,
  useGetSingleAreaByIdQuery,
  useAddAreaMutation,
  useUpdateAreaMutation,
  useDeleteAreaMutation
} = areaApi;
