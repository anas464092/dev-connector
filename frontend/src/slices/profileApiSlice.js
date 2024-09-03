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
        addEducation: builder.mutation({
            query: (data) => ({
                url: `${PROFILE_URL}/education`,
                method: 'POST',
                body: data,
            }),
        }),
        deleteEducation: builder.mutation({
            query: (id) => ({
                url: `${PROFILE_URL}/education/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetCurrentMutation,
    useAddEducationMutation,
    useDeleteEducationMutation,
} = userApiSlice;
