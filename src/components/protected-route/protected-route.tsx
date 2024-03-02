import { Navigate, useLocation } from "react-router-dom";
import {
  selectIsAuthChecked,
  selectUser,
} from "../../services/store/user/reducers";
import { JSX, ReactElement } from "react";
import { useAppSelector } from "../../services/store/hooks";

type TProtectedRouteProps = {
  UnAuth?: boolean;
  component: ReactElement;
};

const ProtectedRoute = ({
  UnAuth = false,
  component,
}: TProtectedRouteProps): JSX.Element => {
  const isAuthChecked = useAppSelector(selectIsAuthChecked);
  const user = useAppSelector(selectUser);
  const location = useLocation();

  if (!isAuthChecked) {
    return null!;
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
export const UnAuth = ({ component }: TProtectedRouteProps) => (
  <ProtectedRoute UnAuth={true} component={component} />
);
