import { Action, combineReducers, configureStore, ThunkAction } from "@reduxjs/toolkit";
import authReducer from "src/features/auth/authSlice";
import userReducer from "src/features/user/userSlice";
import loadingReducer from "src/features/loading/loadingSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  loading: loadingReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
