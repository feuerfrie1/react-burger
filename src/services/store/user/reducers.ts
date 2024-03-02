import { createSlice } from "@reduxjs/toolkit";
import { TUser } from "../../../utils/types";
import { login, register, getUser, editUser, logout } from "./actions";

type TInitialState = {
  user: TUser | null;
  isAuthChecked: boolean;
}

const initialState: TInitialState = {
  user: null,
  isAuthChecked: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(getUser.rejected, (state) => {
        state.user = null;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
  selectors: {
    selectUser: (state) => state.user,
    selectIsAuthChecked: (state) => state.isAuthChecked,
  },
});

const { actions, selectors, reducer } = userSlice;
export const { setAuthChecked } = actions;
export const { selectUser, selectIsAuthChecked } = selectors;

export default reducer;

type TUserActionCreators = typeof userSlice.actions;

export type TUserActions = ReturnType<TUserActionCreators[keyof TUserActionCreators]>;