import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import UserAuth from "./Context/Auth";
import { useState } from "react";
import Cookies from "js-cookie";
import TodoView from "./pages/TodoView";
axios.defaults.baseURL = "http://localhost:3000/";
axios.defaults.withCredentials = true;
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Cookies.get("token") ? true : false
  );
  const login = () => {
    setIsAuthenticated(true);
    // location.reload();
  };

  const logout = () => {
    setIsAuthenticated(false);
    location.reload();
  };
  console.log(isAuthenticated);

  return (
    <>
      <UserAuth.Provider value={{ isAuthenticated, login, logout }}>
        <Header />
        <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
        <Routes>
          <Route path="/" element={<TodoView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </UserAuth.Provider>
    </>
  );
}

export default App;
