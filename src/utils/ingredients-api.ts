import { INGREDIENTS_API } from "./constants";

type TFetchOptions =
  | {
      method: string;
      headers: {
        [name: string]: string;
      };
      body?: string;
    }
  | undefined;

type TRefreshData = {
  success: string;
  refreshToken: string;
  accessToken: string;
};

const checkResponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export async function makeRequest<T>(
  url: string,
  options: TFetchOptions = undefined
): Promise<T> {
  const response = await fetch(url, options);
  return checkResponse(response);
}

export async function refreshToken(): Promise<TRefreshData> {
  return await makeRequest(`${INGREDIENTS_API}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
}

export const refreshTokenRequest = async <T>(
  url: string,
  options: TFetchOptions
): Promise<T> => {
  try {
    return await makeRequest<T>(url, options);
  } catch (err) {
    if (err === "jwt expired" && options) {
      let refreshData: TRefreshData;
      try {
        refreshData = await refreshToken();
      } catch (err) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return Promise.reject(err);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      return await makeRequest<T>(url, options);
    } else {
      return Promise.reject(err);
    }
  }
};
