import { configureStore } from "@reduxjs/toolkit";
import { homeSlice, homeSliceReducers } from "./homeSlice";
export const store = configureStore({
  reducer: {
    home: homeSliceReducers,
  },
});
