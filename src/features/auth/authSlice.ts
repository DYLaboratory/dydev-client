import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginData } from "src/models/data/dataModels";
import { signIn, signOut } from "src/services/auth/authApi";
import { AuthState } from "src/models/state/stateModels";
import { clearLoginUserInfo } from "src/features/user/userSlice";

const initialState: AuthState = {
  status: 'loading',
  isLogin: false,
  isAdmin: false,
  isSuper: false,
  userId: null,
  userType: null,
  name: null,
  email: null,
  lastLoginDateTime: null
};

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (data: LoginData, { rejectWithValue }) => {
    try {
      return await signIn(data);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const logOutAsync = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      return await signOut();
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loginAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = 'idle';

        const data = action.payload?.data;

        if (data) {
          state.isLogin = true;
          state.isAdmin = data.isAdmin;
          state.isSuper = data.isSuper;
          state.userId = data.userId;
          state.userType = data.userType;
          state.name = data.name;
          state.email = data.email;
          state.lastLoginDateTime = data.lastLoginDateTime;
        } else {
          clearLoginUserInfo();
        }
      })
      .addCase(loginAsync.rejected, state => {
        state.status = 'failed';
      })
      .addCase(logOutAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(logOutAsync.fulfilled, state => {
        state.status = 'idle';
        clearLoginUserInfo();
      })
      .addCase(logOutAsync.rejected, state => {
        state.status = 'failed';
      });
  }
});

export default authSlice.reducer;
