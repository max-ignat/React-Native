import { configureStore , combineReducers} from "@reduxjs/toolkit";
import { authSlice } from "./auth/authReducer";
import { dashSlice } from "./dashboard/dashReducer";
const rootReducer = combineReducers({
    [authSlice.name]: authSlice.reducer,
    [dashSlice.name] : dashSlice.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
});