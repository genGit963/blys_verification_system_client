import React, { useState, useRef } from "react";
import { AUTH_API } from "../api/auth_api";
import LongitudnalWaveLoading from "../components/loading";
import { useNavigate } from "react-router-dom";

const VerificationCodeInput: React.FC = () => {
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState<boolean[]>(Array(6).fill(false));
  const [submitError, setSubmitError] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return; // Only numeric input

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    validateInputs(newCode);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d{6}$/.test(pastedData)) return;

    const newCode = pastedData.split("");
    setCode(newCode);
    validateInputs(newCode);

    newCode.forEach((_, i) => {
      if (inputRefs.current[i]) {
        inputRefs.current[i]!.value = newCode[i];
      }
    });

    if (inputRefs.current[5]) {
      inputRefs.current[5]!.focus();
    }
  };

  const validateInputs = (currentCode: string[]) => {
    const newError = currentCode.map((value) => !value || !/^\d$/.test(value));
    setError(newError);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // console.log("Code:", code, "join: ", code.join(""));
    e.preventDefault();
    validateInputs(code);
    if (error.some((err) => err)) {
      setSubmitError("Please fill out all fields correctly.");
      return;
    }

    try {
      setLoading(true);
      await AUTH_API.verify_code(Number(code.join(""))).then((response) => {
        if (response.data.status === "success") {
          //   console.log("Success:", response.data);
          alert("Code Verified !");
          setSubmitError(null);
          navigate("/home");
        }
      });
    } catch (err) {
    //   console.error("API error:", err);
      setSubmitError("verification failed !!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="verify_page">
        <h1>Verification Code: </h1>
        {loading && <LongitudnalWaveLoading />}
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            {code.map((digit, index) => (
              <input
                className="code"
                required
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleChange(e.target.value, index)}
                onPaste={handlePaste}
                style={{ borderColor: error[index] ? "red" : "black" }}
              />
            ))}
          </div>
          {submitError && <p style={{ color: "red" }}>{submitError}</p>}
          <button type="submit">
            <h3>SUBMIT</h3>
          </button>
        </form>

        <p className="email_spam">
          <span>Note</span>: check trash or spam folder if email isn't found in
          primary section.
        </p>
      </div>
    </div>
  );
};

export default VerificationCodeInput;
