
export const ingredientsApi = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export async function makeRequest(ingredientsApi, options = {}) {
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

export const refreshTokenRequest = async (ingredientsApi, options) => {
  try {
    return await makeRequest(ingredientsApi, options);
  } catch (err) {
    if (err.message === "jwt expired") {
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