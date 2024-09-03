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
        addExperience: builder.mutation({
            query: (data) => ({
                url: `${PROFILE_URL}/experience`,
                method: 'POST',
                body: data,
            }),
        }),
        deleteExperience: builder.mutation({
            query: (id) => ({
                url: `${PROFILE_URL}/experience/${id}`,
                method: 'DELETE',
            }),
        }),
        updateProfile: builder.mutation({
            query: (data) => ({
                url: `${PROFILE_URL}/`,
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const {
    useGetCurrentMutation,
    useAddEducationMutation,
    useDeleteEducationMutation,
    useAddExperienceMutation,
    useDeleteExperienceMutation,
    useUpdateProfileMutation,
} = userApiSlice;
