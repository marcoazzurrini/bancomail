import { BrowserRouter, Route, Routes } from "react-router-dom";
import UsersList from "./components/UsersList";
import LoginForm from "./components/Login";
import RegistrationForm from "./components/Register";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UsersList />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
