import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "map",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    addPinData: (state) => {
      state.data = null;
      state.loading = true;
    },
    addPinDataSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    addPinDataError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { addPinData, addPinDataSuccess, addPinDataError } = slice.actions;

export default slice;
