import { PropsWithChildren, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkAuthStatus } from "../api";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      const status = await checkAuthStatus();
      setIsAuthenticated(status);
      setIsLoading(false);
    };
    checkStatus();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
