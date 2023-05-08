import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UsersList from "./components/UsersList";
import LoginForm from "./components/Login";
import RegistrationForm from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import { checkAuthStatus } from "./api";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      const status = await checkAuthStatus();
      setIsAuthenticated(status);
    };
    checkStatus();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <UsersList />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
