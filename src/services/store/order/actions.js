import { createAsyncThunk } from "@reduxjs/toolkit";
import { makeRequest, ingredientsApi } from "../../../utils/ingredients-api";
export const makeOrder = createAsyncThunk(
  "burger-ingredients/postOrder",
  async (ingredientsIds) =>
    makeRequest(`${ingredientsApi}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        ingredients: ingredientsIds,
      }),
    })
);
