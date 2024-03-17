import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  makeRequest,
  refreshTokenRequest,
} from "../../../utils/ingredients-api";
import { setAuthChecked } from "./reducers";
import { AppDispatch } from "../types";
import { INGREDIENTS_API } from "../../../utils/constants";

type TAuthRequest = {
  email: string;
  password: string;
  name?: string;
}

type TAuthResponse = {
  success: boolean;
  user: {
    "name": string;
    "email": string;
  };
  accessToken: string;
  refreshToken: string;
}

type TLogoutResponse = {
  success: boolean;
  message: string;
}

type TUserResponse = {
  success: boolean;
  user: {
    email: string;
    name: string;
  }
}

export const login = createAsyncThunk("user/login", async (body: TAuthRequest) => {
  const res = await makeRequest<TAuthResponse>(`${INGREDIENTS_API}/auth/login`, {
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

export const register = createAsyncThunk("user/register", async (body: TAuthRequest) => {
  const res = await makeRequest<TAuthResponse>(`${INGREDIENTS_API}/auth/register`, {
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
  return await refreshTokenRequest<TUserResponse>(`${INGREDIENTS_API}/auth/user`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: localStorage.getItem('accessToken') || ''
    },
  });
})

export const editUser = createAsyncThunk("user/patchUser", async (body: TAuthRequest) => {
  return await refreshTokenRequest<TUserResponse>(`${INGREDIENTS_API}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: localStorage.getItem("accessToken")  || '',
    },
    body: JSON.stringify({ ...body }),
  });
});

export const logout = createAsyncThunk("user/logout", async () => {
  const res = await makeRequest<TLogoutResponse>(`${INGREDIENTS_API}/auth/logout`, {
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

export const checkUserAuth = () => (dispatch: AppDispatch) => {
  if (localStorage.getItem("accessToken")) {
    dispatch(getUser());
    dispatch(setAuthChecked(true));
  } else {
    dispatch(setAuthChecked(true));
  }
};
