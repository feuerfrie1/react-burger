import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  makeRequest,
  refreshTokenRequest,
  ingredientsApi,
} from "../../../utils/ingredients-api";
import { setAuthChecked } from "./reducers";

export const login = createAsyncThunk("user/login", async (body) => {
  const res = await makeRequest(`${ingredientsApi}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ ...body }),
  });
  localStorage.setItem("refreshToken", res.refreshToken);
  localStorage.setItem("accessToken", res.accessToken);
  return res;
});

export const register = createAsyncThunk("user/register", async (body) => {
  const res = await makeRequest(`${ingredientsApi}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ ...body }),
  });
  localStorage.setItem("refreshToken", res.refreshToken);
  localStorage.setItem("accessToken", res.accessToken);
  return res;
});

export const getUser = createAsyncThunk("user/getUser", async () => {
  const res = await refreshTokenRequest(`${ingredientsApi}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: localStorage.getItem("accessToken"),
    },
  });
  if (!res.success) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
  return res;
});

export const editUser = createAsyncThunk("user/patchUser", async (body) => {
  return await refreshTokenRequest(`${ingredientsApi}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: localStorage.getItem("accessToken"),
    },
    body: JSON.stringify({ ...body }),
  });
});

export const logout = createAsyncThunk("user/logout", async () => {
  const res = await makeRequest(`${ingredientsApi}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("accessToken");
  return res;
});

export const checkUserAuth = () => (dispatch) => {
  if (localStorage.getItem("accessToken")) {
    dispatch(getUser());
  } else {
    dispatch(setAuthChecked(true));
  }
};
