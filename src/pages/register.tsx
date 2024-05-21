import React, { useState } from "react";
import "./auth.scss";
import { useNavigate } from "react-router-dom";
import { RegisterInterface } from "../model/auth";
import { AUTH_API } from "../api/auth_api";
import LongitudnalWaveLoading from "../components/loading";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState<RegisterInterface>({
    email: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // console.log("SignUpPage: ", registerData);
    e.preventDefault();
    try {
      setLoading(true);
      await AUTH_API.register(registerData).then((Response) => {
        if (Response.data.status === "success") {
          alert("Check your email for Verification Code. ");
          navigate("/verify_code");
        }
      });
    } catch (error) {
      setError(String(error));
      console.error("Register failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="auth">
        <div className="container">
          {loading && <LongitudnalWaveLoading />}
          <h1 style={{ color: "gray" }}>Blys Test</h1>
          <h1>Verification System</h1>
          <p>Enter a valid email to verify</p>
          <form onSubmit={handleSubmit}>
            <input
              required
              id="email"
              type="email"
              autoComplete="email"
              placeholder="Email"
              value={registerData.email}
              onChange={(e) => setRegisterData({ email: e.target.value })}
            />
            {error && <div className="server_error">{error}</div>}
            <button type="submit">
              <h3>SEND CODE</h3>
            </button>
          </form>
        </div>
      </div>
  );
};

export default RegisterPage;
