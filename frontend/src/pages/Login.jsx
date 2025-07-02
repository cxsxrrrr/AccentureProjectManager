import React from "react";
// import accentureLogo from "../assets/accenture-logo.svg";
import "../index.css";
import LoginForm from "../components/LoginForm";
import "../stylesheets/logo.css";

export default function Login() {
  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden font-[sansation] rounded-tr-2xl rounded-br-2xl">
      {/* Panel izquierdo con logo */}
      <div
        className="
          w-full
          md:w-1/2
          h-48 md:h-auto
          bg-purple-600
          flex
          justify-center
          items-center
          relative
          rounded-none md:rounded-r-2xl
          shadow-none md:shadow-[8px_0_16px_-4px_rgba(0,0,0,0.5)]
          "
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
            <div className="bar top"></div>
          </div>
        </div>
        {/* Copyright abajo a la izquierda */}
        <h3 className="absolute left-4 bottom-4 text-white text-base md:text-2xl font-medium">
          © Accenture Inc.
        </h3>
      </div>

      {/* Panel derecho con título y subtítulo */}
      <div
        className="
          w-full md:w-1/2
          flex flex-col
          justify-start items-center
          px-4 md:px-8
          pt-8 md:pt-[6rem]
          "
        data-section="login-form-section"
      >
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl px-2 sm:px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 text-left font-[sansation]">
            Accenture
          </h1>

          <p className="mt-3 text-base sm:text-lg md:text-xl text-gray-600 text-left font-[sansation]">
            Access your workspace and keep your projects moving forward.
          </p>

          <div className="mt-8 w-full">
            <LoginForm />
            {/*
            <div className="mt-4 text-right">
              <a
                href="/recovery"
                className="text-purple-600 hover:underline font-semibold text-base"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            */}
          </div>
        </div>
      </div>
    </div>
  );
}
