import { apiSlice } from "../../api/rootApi";



export const registerApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (credentials) => ({
                url: 'user/register',
                method: 'POST',
                body: credentials,
                headers: {
                    'Authorization': `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`
                }
            })
        })
    }),
    overrideExisting: false,
})

export const { useRegisterMutation } = registerApiSlice;