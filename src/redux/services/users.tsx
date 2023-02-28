import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://43.206.242.55:5000/" }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getTokens: builder.query({
        query: ({userID,cardID}) => `user/${userID}/card/${cardID}/tokens`,
        providesTags: ['Users']
    }),
    createLogin: builder.mutation({
      query: ({ email, password }) => ({
        url: "login",
        method: "POST",
        body: { email: email, password: password },
      }),
    }),
    activateTokens: builder.mutation({
      query: (id) => ({
        url: `activate/token/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ['Users']
    }),
    suspendTokens: builder.mutation({
      query: (id) => ({
        url: `suspend/token/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ['Users']
    }),
    deleteTokens: builder.mutation({
      query: (id) => ({
        url: `delete/token/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ['Users']
    }),
    createTokens: builder.mutation({
      query: ({userID,cardID,domainName}) => ({
        url: `http://43.206.242.55:5000/user/${userID}/card/${cardID}/create/token`,
        method: "POST",
        body: {domainName: domainName}
      }),
      invalidatesTags: ['Users']
    })
  }),
});

export const {
  useCreateLoginMutation,
  useActivateTokensMutation,
  useSuspendTokensMutation,
  useDeleteTokensMutation,
  useCreateTokensMutation,
  useGetTokensQuery
} = usersApi;
