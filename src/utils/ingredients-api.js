export const ingredientsApi = "https://norma.nomoreparties.space/api";

export async function makeRequest(ingredientsApi, options = {}) {
  const res = await fetch(ingredientsApi, options);
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}
