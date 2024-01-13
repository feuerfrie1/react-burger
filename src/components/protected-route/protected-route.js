import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import {
  selectIsAuthChecked,
  selectUser,
} from "../../services/store/user/reducers";
import PropTypes from "prop-types";

const ProtectedRoute = ({ UnAuth = false, component }) => {
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const user = useSelector(selectUser);
  const location = useLocation();

  if (!isAuthChecked) {
    return null;
  }

  if (UnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!UnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return component;
};

export const Auth = ProtectedRoute;
export const UnAuth = ({ component }) => (
  <ProtectedRoute UnAuth={true} component={component} />
);

ProtectedRoute.propTypes = {
  UnAuth: PropTypes.bool,
  component: PropTypes.element.isRequired,
};
