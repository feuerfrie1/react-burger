import { configureStore } from "@reduxjs/toolkit";
import burgerIngredients from "./store/burger-ingredients/reducers";
import burgerConstructor from "./store/buger-constructor/reducers";
import currentIngredientDetails from "./store/current-ingredient-details/reducers";
import order from "./store/order/reducers";
import user from "../services/store/user/reducers";

export const store = configureStore({
  reducer: {
    burgerIngredients,
    burgerConstructor,
    currentIngredientDetails,
    order,
    user,
  },
});
