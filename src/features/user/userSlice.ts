import { UserState } from 'src/models/state/stateModels';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/app/store';
import { getLoginUser } from 'src/services/auth/authApi';

const initialState: UserState = {
  status: 'idle',
  isLogin: false,
  userId: null,
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
      state = initialState;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getUserAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const data = action.payload.data;

        if (data) {
          state.isLogin = true;
          state.userId = data.userId;
          state.name = data.name;
          state.email = data.email;
          state.lastLoginDateTime = data.lastLoginDateTime;
        } else {
          state = initialState;
        }
      })
      .addCase(getUserAsync.rejected, state => {
        state.status = 'failed';
      });
  }
});

export const { clearLoginUserInfo } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
