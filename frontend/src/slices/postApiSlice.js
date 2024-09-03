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
        getPost: builder.mutation({
            query: (id) => ({
                url: `${POSTS_URL}/${id}`,
                method: 'GET',
            }),
        }),
    }),
});

export const { useAddPostMutation, useAllPostsMutation, useGetPostMutation } =
    postsApiSlice;
