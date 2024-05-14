import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    user: null,
    error: null
}

export const loginUser = createAsyncThunk('user/loginUser', async (userCredentials) => {
    const response = await axios.post('http://localhost:3333/login', userCredentials);
    localStorage.setItem("token", response.data.token);
    return response
})

const authSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.user = null;
            state.error = null;
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.user = null;
            if (action.error.message == 'Request failed with status code 401') {
                state.error = 'Access Denied!';
            }
            else {
                state.error = action.error.message;
            }
        })
    }
})

export default authSlice.reducer;
export const { login, logout } = authSlice.actions;