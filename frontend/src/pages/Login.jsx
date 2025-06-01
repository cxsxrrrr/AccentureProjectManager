import React from "react";
import accentureLogo from "../assets/accenture-logo.svg";
import LoginForm from "../components/LoginForm";

export default function Login() {
  return (
    <div className="flex h-screen overflow-hidden font-sans">
      {/* Panel izquierdo con logo */}
      <div
        className="w-1/2 bg-accenture flex justify-center items-center"
        data-section="login-left-panel"
      >
        <img
          src={accentureLogo}
          alt="Accenture Logo"
          className="w-32 h-auto"
          data-element="login-logo"
        />
      </div>

      {/* Panel derecho con título y subtítulo */}
      <div
      className="w-1/2 flex flex-col justify-start items-center px-8 pt-[6rem]"
      data-section="login-form-section"
      >
      <div className="w-full max-w-md">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 text-center">
          Accenture
        </h1>

        <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-600 text-center">
          Access your workspace and keep your projects moving forward.
        </p>

        <div className="mt-10 w-full">
          <LoginForm />
        </div>
      </div>
    </div>
    </div>
  );
}
