import { apiSlice } from './apiSlice';

const POSTS_URL = '/api/posts';

export const postsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addPost: builder.mutation({
            query: (data) => ({
                url: `${POSTS_URL}/`,
                method: 'POST',
                body: data,
            }),
        }),
        allPosts: builder.mutation({
            query: () => ({
                url: `${POSTS_URL}/`,
                method: 'GET',
            }),
        }),
    }),
});

export const { useAddPostMutation, useAllPostsMutation } = postsApiSlice;
