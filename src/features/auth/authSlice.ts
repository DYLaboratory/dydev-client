import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginData } from "src/models/data/dataModels";
import { signIn, signOut } from "src/services/auth/authApi";
import { AuthState } from "src/models/state/stateModels";
import { AxiosResponse } from "axios";

const initialState: AuthState = {
  status: 'idle'
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
      .addCase(
        loginAsync.fulfilled,
        (state, action: PayloadAction<AxiosResponse>) => {
          state.status = 'idle';
        }
      )
      .addCase(loginAsync.rejected, state => {
        state.status = 'failed';
      })
      .addCase(logOutAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(logOutAsync.fulfilled, state => {
        state.status = 'idle';
      })
      .addCase(logOutAsync.rejected, state => {
        state.status = 'failed';
      });
  }
});

export default authSlice.reducer;
