import React, { useState } from "react";
import "../index.css";
import "../stylesheets/logo.css";
import axios from "../services/axios";

export default function Recovery() {
  const [step, setStep] = useState(1); // 1: email, 2: code, 3: done
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Step 1: Send code
  const handleSendCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await axios.post("/auth/recovery/send-code", { email });
      setStep(2);
      setSuccess("A recovery code has been sent to your email.");
    } catch (err) {
      setError("Failed to send the code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Validate code
  const handleValidateCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await axios.post("/auth/recovery/validate-code", { email, code });
      setStep(3);
      setSuccess("Valid code. You can reset your password now.");
    } catch (err) {
      setError(
        err.response?.data || "Invalid or expired code. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Recover password
  const handleRecoverPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await axios.post("/auth/recovery/password", { email });
      setSuccess(
        "A new password has been sent to your email address."
      );
      setStep(4);
    } catch (err) {
      setError(
        err.response?.data || "Failed to reset the password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white font-[sansation] relative">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col items-center animate-fade-in relative">
        <h2 className="text-3xl font-bold text-purple-700 mb-2">Password Recovery</h2>
        <p className="text-gray-600 mb-6 text-center">
          {step === 1 && "Enter your email to receive a recovery code."}
          {step === 2 && "Enter the 6-digit code you received in your email."}
          {step === 3 && "Click to generate a new password and receive it in your email."}
          {step === 4 && "Done! Check your email for your new password."}
        </p>
        {error && <div className="text-red-600 font-semibold text-center mb-4">{error}</div>}
        {success && <div className="text-green-600 font-semibold text-center mb-4">{success}</div>}
        {step === 1 && (
          <form className="w-full" onSubmit={handleSendCode}>
            <input
              type="email"
              className="block w-full mb-4 border border-purple-300 rounded-lg px-4 py-2 focus:outline-purple-500 text-lg"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
            <button
              type="submit"
              className="w-full py-2 rounded bg-purple-600 text-white font-semibold text-lg hover:bg-purple-700 transition"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send code"}
            </button>
          </form>
        )}
        {step === 2 && (
          <form className="w-full flex flex-col items-center" onSubmit={handleValidateCode}>
            <div className="flex justify-center gap-2 mb-4">
              {[0,1,2,3,4,5].map((i) => (
                <input
                  key={i}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  pattern="[0-9]{1}"
                  className="w-12 h-12 text-center text-2xl border border-purple-300 rounded-lg focus:outline-purple-500 bg-white shadow-sm"
                  value={code[i] || ''}
                  onChange={e => {
                    const val = e.target.value.replace(/\D/g, "");
                    if (!val) return;
                    const newCode = code.substring(0, i) + val + code.substring(i + 1);
                    setCode(newCode.slice(0,6));
                    // Focus next
                    if (val && i < 5) {
                      const next = document.getElementById(`pin-input-${i+1}`);
                      if (next) next.focus();
                    }
                  }}
                  onKeyDown={e => {
                    if (!/\d/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
                      e.preventDefault();
                    }
                    if (e.key === 'Backspace' && !code[i] && i > 0) {
                      const prev = document.getElementById(`pin-input-${i-1}`);
                      if (prev) prev.focus();
                    }
                  }}
                  id={`pin-input-${i}`}
                  autoFocus={i === 0}
                  disabled={loading}
                  autoComplete="one-time-code"
                />
              ))}
            </div>
            <button
              type="submit"
              className="w-full py-2 rounded bg-purple-600 text-white font-semibold text-lg hover:bg-purple-700 transition"
              disabled={loading || code.length !== 6}
            >
              {loading ? "Validating..." : "Validate code"}
            </button>
          </form>
        )}
        {step === 3 && (
          <form className="w-full" onSubmit={handleRecoverPassword}>
            <button
              type="submit"
              className="w-full py-2 rounded bg-purple-600 text-white font-semibold text-lg hover:bg-purple-700 transition"
              disabled={loading}
            >
              {loading ? "Sending..." : "Recover password"}
            </button>
          </form>
        )}
        {step === 4 && (
          <div className="flex flex-col items-center w-full gap-4 mt-8">
            <div className="text-center text-purple-700 font-semibold text-lg">
              Process completed. Check your email for your new password.
            </div>
          </div>
        )}
      </div>
      <div className="w-full max-w-md flex justify-end mt-2">
        <a
          href="/"
          className="text-purple-600 hover:underline font-semibold text-base"
        >
          Back to login
        </a>
      </div>
    </div>
  );
}
