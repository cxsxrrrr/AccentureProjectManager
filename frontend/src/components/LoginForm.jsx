import React, { useState } from "react";

export default function LoginForm() {
  const [user, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User:", user);
    console.log("Password:", password);
    console.log("Remember me:", remember);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-6"
      data-element="login-form"
    >
      {/* User */}
      <div>
        <label htmlFor="user" className="text-3xl  block mb-2 font-medium text-gray-700">
          User
        </label>
        <input
          type="user"
          id="user"
          placeholder="Enter your username"
          value={user}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-gray-50 border mt-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accenture focus:border-accenture block w-full p-2.5"
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
        className="w-full text-white bg-purple-600 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-accenture font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Log in
      </button>

    </form>
  );
}
