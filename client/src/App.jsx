import { Route, Routes } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./views/Home";
export default function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

// Redux toolkit for auth state management
