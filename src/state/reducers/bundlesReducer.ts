import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BundlesState {
  [key: string]: {
    loading: boolean;
    code: string;
    err: string;
  };
}

const initialState: BundlesState = {};

const bundlesSlice = createSlice({
  name: 'bundles',
  initialState,
  reducers: {
    bundleStart: (state, action: PayloadAction<string>) => {
      const cellId = action.payload;
      state[cellId] = {
        loading: true,
        code: '',
        err: '',
      };
    },
    bundleComplete: (
      state,
      action: PayloadAction<{
        cellId: string;
        bundle: { code: string; err: string };
      }>
    ) => {
      const {
        cellId,
        bundle: { code, err },
      } = action.payload;
      state[cellId] = {
        loading: false,
        code,
        err,
      };
    },
  },
});

export const { bundleStart, bundleComplete } = bundlesSlice.actions;
export default bundlesSlice.reducer;
