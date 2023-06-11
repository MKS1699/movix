import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    url: {},
    genres: {},
  },
  reducers: {
    getAPIconfiguration: (state, action) => {
      state.url = action.payload;
    },
    getGenres: (state, action) => {
      state.genres = action.payload;
    },
  },
});

// homeSlice Reducers exporting
export const homeSliceReducers = homeSlice.reducer;

// homeSlice Actions
export const { getAPIconfiguration, getGenres } = homeSlice.actions;
