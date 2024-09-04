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
        likeAndUnlikePost: builder.mutation({
            query: (id) => ({
                url: `${POSTS_URL}/${id}`,
                method: 'POST',
            }),
        }),
        addComment: builder.mutation({
            query: ({ id, text }) => ({
                url: `${POSTS_URL}/comment/${id}`,
                method: 'POST',
                body: { text },
            }),
        }),
        deleteComment: builder.mutation({
            query: ({ postId, commentId }) => ({
                url: `${POSTS_URL}/comment/${postId}/${commentId}`,
                method: 'DELETE',
            }),
        }),
        likedPosts: builder.mutation({
            query: () => ({
                url: `${POSTS_URL}/user/liked`,
                method: 'GET',
            }),
        }),
        userPosts: builder.mutation({
            query: () => ({
                url: `${POSTS_URL}/user/posts`,
                method: 'GET',
            }),
        }),
        deletePost: builder.mutation({
            query: (id) => ({
                url: `${POSTS_URL}/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useAddPostMutation,
    useAllPostsMutation,
    useGetPostMutation,
    useLikeAndUnlikePostMutation,
    useAddCommentMutation,
    useDeleteCommentMutation,
    useLikedPostsMutation,
    useUserPostsMutation,
    useDeletePostMutation,
} = postsApiSlice;
