import { baseApi } from "../../API/baseApi";

const areaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllArea: builder.query({
      query: () => {
        return {
          url: `/area`,
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
  }),
});

export const {
  useGetAllAreaQuery,
  useGetSingleAreaByIdQuery,
  useAddAreaMutation,
} = areaApi;
