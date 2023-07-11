import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../state/userSlice'

// redux store setup using redux toolkit
export const store = configureStore({
	reducer: {
		user:userReducer,
	},
});
