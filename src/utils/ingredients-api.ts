type TFetchOptions =
  | {
      method: string;
      headers: {
        [name: string]: string;
      };
      body: string;
    }
  | undefined;

export const ingredientsApi = "https://norma.nomoreparties.space/api";

const checkResponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export async function makeRequest(
  ingredientsApi: string,
  options: TFetchOptions = undefined
) {
  const response = await fetch(ingredientsApi, options);
  return checkResponse(response);
}

export const refreshToken = async () => {
  return await makeRequest(`${ingredientsApi}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
};

export const refreshTokenRequest = async (
  ingredientsApi: string,
  options: TFetchOptions = undefined
) => {
  try {
    return await makeRequest(ingredientsApi, options);
  } catch (err) {
    if (err === "jwt expired" && options) {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const response = await fetch(ingredientsApi, options);
      return await checkResponse(response);
    } else {
      return Promise.reject(err);
    }
  }
};
