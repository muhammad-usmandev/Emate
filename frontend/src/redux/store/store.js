import { configureStore } from "@reduxjs/toolkit";
import userReducer  from "../authSlice/authSlice";

const store = configureStore({
    reducer: {
        user: userReducer
    }
});

export default store;