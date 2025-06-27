import React, { useState } from "react";
import { authService } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [cedula, setCedula] = useState(""); // Cambiado de user a cedula
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(""); // Estado de error
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // ← Esto previene la recarga
    setLoading(true);
    setError("");

    try {
      // Llamada al servicio de autenticación
      const result = await authService.login(cedula, password);

      if (result.success) {
        console.log("Login exitoso!", result.token);
        const lastDigit = cedula[cedula.length - 1];
        if (["0", "1"].includes(lastDigit)) {
          navigate("/admin");
        } else if (["2", "3", "4"].includes(lastDigit)) {
          navigate("/manager");
        } else if (["5", "6"].includes(lastDigit)) {
          navigate("/team");
        } else {
          navigate("/client");
        }
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
      console.error("Error en login:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-6"
      data-element="login-form"
    >
      {/* Mostrar errores */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Cédula */}
      <div>
        <label htmlFor="cedula" className="text-3xl block mb-2 font-medium text-gray-700">
          ID user
        </label>
        <input
          type="text"
          id="cedula"
          placeholder="Enter your ID user"
          value={cedula}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*$/.test(value)) setCedula(value);
          }}
          required
          disabled={loading}
          className="bg-gray-50 border mt-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accenture focus:border-accenture block w-full p-2.5 disabled:opacity-50"
        />
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="text-3xl block mb-2 font-medium text-gray-700">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-gray-50 border mt-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accenture focus:border-accenture block w-full p-2.5 pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 focus:outline-none"
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              // 👁️ Ojo abierto
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M1.5 12S5 5 12 5s10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            ) : (
              // 👁️‍🗨️ Ojo cerrado (slash)
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M17.94 17.94C16.12 19.2 14.14 20 12 20 5 20 1.5 12 1.5 12c.95-1.9 2.32-4.15 4.33-6.06M10.12 6.13C10.72 6.04 11.35 6 12 6c7 0 10.5 7 10.5 7-.6 1.21-1.39 2.57-2.41 3.88M9.59 9.59a3 3 0 0 1 4.24 4.24" />
                <path d="M3 3l18 18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Forgot password (solo) */}
      <div className="flex justify-end">
        <a href="#" className="text-sm hover:underline">
          Forgot password?
        </a>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full text-white bg-purple-600 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-accenture font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {loading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Iniciando sesión...
          </>
        ) : (
          "Log in"
        )}
      </button>
    </form>
  );
}
