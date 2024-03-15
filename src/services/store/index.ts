import { configureStore, combineReducers } from "@reduxjs/toolkit";
import burgerIngredients from "./burger-ingredients/reducers";
import burgerConstructor from "./buger-constructor/reducers";
import order from "./order/reducers";
import user from "./user/reducers";
import feedOrders from "../store/feed-orders/reducers";
import profileOrders from "../store/profile-orders/reducers";
import { feedOrdersMiddleware } from "../../services/store/feed-orders/actions";
import { profileOrdersMiddleware } from "./profile-orders/actions";

const reducer = combineReducers({
  burgerIngredients,
  burgerConstructor,
  order,
  user,
  feedOrders,
  profileOrders,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      feedOrdersMiddleware,
      profileOrdersMiddleware
    );
  },
});

export default store;
