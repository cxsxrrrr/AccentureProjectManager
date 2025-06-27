import React from "react";
// import accentureLogo from "../assets/accenture-logo.svg";
import "../index.css";
import LoginForm from "../components/LoginForm";
import "../stylesheets/logo.css"

export default function Login() {
  return (
    <div className="flex h-screen overflow-hidden font-sans rounded-tr-2xl rounded-br-2xl">
      {/* Panel izquierdo con logo */}

      <div
        className="w-1/2 bg-purple-600 flex justify-center items-center relative rounded-r-2xl shadow-[8px_0_16px_-4px_rgba(0,0,0,0.5)]"
        data-section="login-left-panel"
      >
        {/* <img
          src={accentureLogo}
          alt="Accenture Logo"
          className="w-110 h-auto"
          data-element="login-logo"
        /> */}
        <div className="rounded-box">
          <div className="accenture-logo">
            <div className="bar bottom"></div>
            <div className="bar top"></div></div>

        </div>
        <h3 className="absolute text-white text-2xl font-medium pt-225 pr-190">
          © Accenture Inc.
        </h3>
      </div>

      {/* Panel derecho con título y subtítulo */}
      <div
        className="w-1/2 flex flex-col justify-start items-center px-8 pt-[6rem]"
        data-section="login-form-section"
      >
        <div className="w-full max-w-lg sm:max-w-xl md:max-w-2xl px-4">
          <h1 className="text-6xl sm:text-4xl md:text-5xl font-bold text-gray-800">
            Accenture
          </h1>

          <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-600">
            Access your workspace and keep your projects moving forward.
          </p>

          <div className="mt-25 w-full">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
