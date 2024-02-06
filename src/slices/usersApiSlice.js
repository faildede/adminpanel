import { apiSlice } from "./apiSlice";

const USERS_URL = 'http://localhost:5094'

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/Auth/login`,
                method: 'POST',
                body: data
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/Auth/register`,
                method: 'POST',
                body: data
            })
        }),
    }),
    

})

export const { useLoginMutation, useRegisterMutation } = usersApiSlice;