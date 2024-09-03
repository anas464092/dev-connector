import { apiSlice } from './apiSlice';

const PROFILE_URL = '/api/profile';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCurrent: builder.mutation({
            query: () => ({
                url: `${PROFILE_URL}/`,
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetCurrentMutation } = userApiSlice;
