import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: "",
    error: "",
    user: {
      id: "",
      username: "",
      email: "",
      avatar: "",
      status: "",
      token: "",
    },
  }

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
        state.status = "";
        state.error = "";
        state.user = {
          id: "",
          username: "",
          email: "",
          avatar: "",
          status: "",
          token: "",
        };
    },
  }
 }
);

export const {logout} = userSlice.actions;

export default userSlice.reducer;

