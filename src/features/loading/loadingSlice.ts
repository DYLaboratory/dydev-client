import { LoadingState } from "src/models/state/stateModels";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "src/app/store";

const initialState: LoadingState = {
  status: 'loading',
  isLoading: false
}

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.status = 'idle';
      state.isLoading = action.payload;
    },
  }
});

export const { setLoading } = loadingSlice.actions;
export const selectLoading = (state: RootState) => state.loading;

export default loadingSlice.reducer;