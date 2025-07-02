import React, { useState } from "react";
import api from "../services/axios";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [cedula, setCedula] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Perform login and fetch user
    try {
      const loginRes = await api.post(
        "http://localhost:8080/api/auth/login",
        { cedula, password }
      );
      const token = loginRes.data;
      localStorage.setItem("token", token);

      // Fetch user data
      const usuarioRes = await api.get(
        `http://localhost:8080/api/usuario/cedula/${cedula}`
      );
      const usuario = usuarioRes.data;
      localStorage.setItem("user", JSON.stringify(usuario));

      // Also store friendly name and role for Sidebar display
      const fullName = `${usuario.nombre}${
        usuario.apellido ? " " + usuario.apellido : ""
      }`;
      localStorage.setItem("username", fullName);
      localStorage.setItem("roleName", usuario.rol?.nombre || "");

      // Redirect by role, support multiple possible backend field names
      const roleObj = usuario.rol || {};
      const roleId = roleObj.rolId ?? roleObj.rol ?? roleObj.id;
      if (!roleId) {
        setError("Usuario sin rol asignado o sin acceso autorizado.");
        return;
      }
      switch (roleId) {
        case 1:
          navigate("/admin", { replace: true });
          break;
        case 2:
          navigate("/manager", { replace: true });
          break;
        case 3:
          navigate("/team", { replace: true });
          break;
        case 4:
          navigate("/client", { replace: true });
          break;
        default:
          setError("Rol no reconocido. Acceso denegado.");
          break;
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Error de conexión con el servidor");
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
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div>
        <label
          htmlFor="cedula"
          className="text-3xl block mb-2 font-medium text-gray-700"
        >
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

      <div>
        <label
          htmlFor="password"
          className="text-3xl block mb-2 font-medium text-gray-700"
        >
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
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600"
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M1.5 12S5 5 12 5s10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M17.94 17.94C16.12 19.2 14.14 20 12 20 5 20 1.5 12 1.5 12c.95-1.9 2.32-4.15 4.33-6.06M10.12 6.13C10.72 6.04 11.35 6 12 6c7 0 10.5 7 10.5 7-.6 1.21-1.39 2.57-2.41 3.88M9.59 9.59a3 3 0 0 1 4.24 4.24" />
                <path d="M3 3l18 18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <a
          href="/recovery"
          className="text-sm text-purple-600 hover:underline font-semibold"
        >
          Forgot password?
        </a>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full text-white bg-purple-600 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-accenture font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {loading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
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
