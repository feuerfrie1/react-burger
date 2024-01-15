import { useEffect } from "react";
import Header from "../app-header/app-header";
import { useDispatch } from "react-redux";
import { fetchIngredients } from "../../services/store/burger-ingredients/actions";
import { checkUserAuth } from "../../services/store/user/actions";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "../../pages/home/home";
import Login from "../../pages/login/login";
import Register from "../../pages/register/register";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import Profile from "../../pages/profile/profile";
import { Auth, UnAuth } from "../protected-route/protected-route";
import User from "../user/user";
import IngredientDetails from "../modal/ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { NotFound404 } from "../../pages/notfound/not-found";
import Orders from "../../pages/orders/orders";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(fetchIngredients());
  }, [dispatch]);

  const closeModal = () => {
    navigate(-1);
  };

  return (
    <>
      <Header />
      <Routes location={background || location}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<UnAuth component={<Login />} />} />
        <Route path="/register" element={<UnAuth component={<Register />} />} />
        <Route
          path="/forgot-password"
          element={<UnAuth component={<ForgotPassword />} />}
        />
        <Route
          path="/reset-password"
          element={<UnAuth component={<ResetPassword />} />}
        />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Auth component={<Profile />} />}>
          <Route index element={<User />} />
          <Route path="orders" element={<Orders/>}/>
          <Route path="*" element={<NotFound404 />} />
        </Route>
        <Route path="/ingredients/:id" element={<IngredientDetails />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal onClose={closeModal}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}
