import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Register from "./pages/register";
import VerifyCode from "./pages/verify_code";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Register />} />
      <Route path="/verify_code" element={<VerifyCode />} />
    </Routes>
  );
};

export default AppRouter;
