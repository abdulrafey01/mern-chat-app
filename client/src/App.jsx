import { Route, Routes } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";

export default function App() {
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
    </Routes>
  );
}

// Redux toolkit for auth state management
