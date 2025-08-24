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

    signup: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/register",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["users"],
    }),

    forgotPassword: builder.mutation({
      query: (forgotPasswordData) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: forgotPasswordData,
        credentials: "include",
      }),
      invalidatesTags: ["users"],
    }),

    resetPassword: builder.mutation({
      query: ({ resetPasswordData, token }) => ({
        url: `/auth/reset-password/${token}`,
        method: "POST",
        body: resetPasswordData,
        credentials: "include",
      }),
      invalidatesTags: ["users"],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/remove-user/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetSingleUserByIdQuery,
  useAddUserMutation,
  useSignupMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useDeleteUserMutation,
} = userApi;
