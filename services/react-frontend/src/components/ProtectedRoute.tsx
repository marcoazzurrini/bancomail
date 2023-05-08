import { Navigate } from "react-router-dom";
import { FunctionComponent, PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  isAuthenticated: boolean;
}

const ProtectedRoute: FunctionComponent<Props> = ({
  children,
  isAuthenticated,
}) => {
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
