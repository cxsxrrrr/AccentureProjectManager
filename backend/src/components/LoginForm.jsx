import React, { useState } from "react";
import { authService } from "../services/authService";

export default function LoginForm() {
  const [cedula, setCedula] = useState(""); // Cambiado de user a cedula
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(""); // Estado de error

  const handleSubmit = async (e) => {
    e.preventDefault(); // ← Esto previene la recarga
    setLoading(true);
    setError("");

    try {
      // Llamada al servicio de autenticación
      const result = await authService.login(cedula, password);
      
      if (result.success) {
        console.log("Login exitoso!", result.token);
        // Aquí puedes redirigir al dashboard
        // Por ejemplo, si usas React Router:
        // navigate('/dashboard');
        alert("Login exitoso!"); // Temporal para probar
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
          onChange={(e) => setCedula(e.target.value)}
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
        <input
          type="password"
          id="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="bg-gray-50 border mt-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accenture focus:border-accenture block w-full p-2.5"
        />
      </div>

      {/* Remember me + Forgot password */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember"
            type="checkbox"
            checked={remember}
            onChange={() => setRemember(!remember)}
            className="w-4 h-4 text-accenture bg-gray-100 border-gray-300 rounded focus:ring-accenture"
          />
          <label htmlFor="remember" className="ml-2 text-sm text-gray-500">
            Remember me
          </label>
        </div>
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