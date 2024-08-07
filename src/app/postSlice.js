import { createSlice } from '@reduxjs/toolkit'
import storage from './storage'

const initialState = storage.get('post', {
    posts: [], searchTerm: '',
})

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload
            storage.set('post', { posts: Array.from(action.payload), searchTerm: state.searchTerm })
        },
        flushPosts: (state) => {
            state.posts = []
            storage.remove('post')
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
            storage.set('post', { posts: state.posts, searchTerm: action.payload })
        },
    }
})

export const { setPosts, flushPosts, setSearchTerm } = postSlice.actions;
export default postSlice.reducer;