import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSystemSettings } from "src/services/system/settingsApi";
import { SystemState } from "src/models/state/stateModels";
import { setLoading } from "src/features/loading/loadingSlice";

const initialState: SystemState = {
  status: 'idle',
  version: '',
  defaultTheme: null,
  defaultLang: null,
  feedDays: 3
};

export const getSystemSettingsAsync = createAsyncThunk(
  'system/settings',
  async () => await getSystemSettings()
);

export const settingsSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getSystemSettingsAsync.pending, state => {
        state.status = 'loading';
        setLoading(false);
      })
      .addCase(getSystemSettingsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        setLoading(true);

        const data = action.payload?.data;

        if (data) {
          state.version = data.version;
          state.defaultTheme = data.defaultTheme;
          state.defaultLang = data.defaultLang;
          state.feedDays = data.feedDays;
        }
      })
      .addCase(getSystemSettingsAsync.rejected, state => {
        state.status = 'failed';
        setLoading(true);
      });
  }
});
