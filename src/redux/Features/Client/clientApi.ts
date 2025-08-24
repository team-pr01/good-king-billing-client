import { baseApi } from "../../API/baseApi";

const clientApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllClients: builder.query({
      query: ({
        keyword = "",
        status = "",
        area = "",
      }: {
        keyword?: string;
        status?: string;
        area?: string;
      }) => {
        let url = `/client?keyword=${encodeURIComponent(keyword)}`;

        if (status && status.toLowerCase() !== "") {
          url += `&status=${encodeURIComponent(status)}`;
        }

        if (area && area.toLowerCase() !== "") {
          url += `&area=${encodeURIComponent(area)}`;
        }

        return {
          url,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["clients"],
    }),

    getSingleClientById: builder.query({
      query: (id) => {
        return {
          url: `/user/${id}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["clients"],
    }),

    addClient: builder.mutation({
      query: (userInfo) => ({
        url: "/client/add",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["clients"],
    }),

    
  }),
});

export const {
  useGetAllClientsQuery,
  useGetSingleClientByIdQuery,
  useAddClientMutation,

} = clientApi;
