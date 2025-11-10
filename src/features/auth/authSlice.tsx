import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedIn: boolean;
  userName: string | null;
  darkMode: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
  userName: null,
  darkMode: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userName = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userName = null;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { login, logout, toggleDarkMode } = authSlice.actions;
export default authSlice.reducer;
