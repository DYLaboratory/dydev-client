import { UserState } from "src/models/state/stateModels";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/app/store";
import { getLoginUser } from "src/services/auth/authApi";
import { setLoading } from "src/features/loading/loadingSlice";

const initialState: UserState = {
  status: 'idle',
  isLogin: false,
  isAdmin: false,
  userId: null,
  userType: null,
  name: null,
  email: null,
  lastLoginDateTime: null
};

export const getUserAsync = createAsyncThunk(
  'user/session',
  async () => await getLoginUser()
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearLoginUserInfo: (state: UserState) => {
      state.isLogin = false;
      state.isAdmin = false;
      state.userId = null;
      state.userType = null;
      state.name = null;
      state.email = null;
      state.lastLoginDateTime = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getUserAsync.pending, state => {
        state.status = 'loading';
        setLoading(false);
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        setLoading(true);

        const data = action.payload?.data;

        if (data) {
          state.isLogin = true;
          state.isAdmin = data.isAdmin;
          state.userId = data.userId;
          state.userType = data.userType;
          state.name = data.name;
          state.email = data.email;
          state.lastLoginDateTime = data.lastLoginDateTime;
        } else {
          clearLoginUserInfo();
        }
      })
      .addCase(getUserAsync.rejected, state => {
        state.status = 'failed';
        setLoading(true);
      });
  }
});

export const { clearLoginUserInfo } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
