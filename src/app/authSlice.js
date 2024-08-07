import { createSlice } from '@reduxjs/toolkit'
import storage from './storage'

const initialState = storage.get('auth', {
    status: false,
    userData: null
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true
            state.userData = action.payload
            storage.set('auth', {
                status: true,
                userData: action.payload
            })
        },
        logout: (state) => {
            state.status = false
            state.userData = null
            storage.remove('auth')
        }
    }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer