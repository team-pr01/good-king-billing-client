import { baseApi } from "../../API/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: ({
        keyword = "",
        role = "",
      }: {
        keyword?: string;
        role?: string;
      }) => {
        let url = `/user?keyword=${encodeURIComponent(keyword)}`;

        if (role && role.toLowerCase() !== "") {
          url += `&role=${encodeURIComponent(role)}`;
        }

        return {
          url,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["users"],
    }),

    getSingleUserById: builder.query({
      query: (id) => {
        return {
          url: `/user/${id}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["users"],
    }),

    addUser: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/signup",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetSingleUserByIdQuery,
  useAddUserMutation,
} = userApi;
