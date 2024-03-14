import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  collapsed: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    setCollapsed: (state, action) => {
      state.collapsed = action.payload;
    },
  },
});

export const { setUser, logout, setCollapsed } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
