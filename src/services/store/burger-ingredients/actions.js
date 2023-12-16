import { createAsyncThunk } from "@reduxjs/toolkit";
import { ingredientsApi, makeRequest } from "../../../utils/ingredients-api";
export const fetchIngredients = createAsyncThunk(
  "burger-ingredients/fetchIngredients",
  async () => makeRequest(`${ingredientsApi}/ingredients`)
);
