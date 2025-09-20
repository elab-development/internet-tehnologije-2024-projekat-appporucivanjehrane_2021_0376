import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import LogoLong from "../../assets/logo-long.png";
import { useAuthStore } from "../../store/authStore";
import LoadingSpinner from "../../components/LoadingSpinner";
const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const { isLoading, loginCustomer, isAuthenticated } = useAuthStore();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!email.trim() || !password.trim()) {
        return toast.error("Provide email & password!");
      }

      await loginCustomer(email, password);

      if (isAuthenticated) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <section className="bg-red-600">
        <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
          <div className="mb-6 flex items-center text-2xl font-semibold text-gray-900">
            <div className="rounded-full bg-white px-2 py-1">
              <img className="w-20" src={LogoLong} alt="logo" />
            </div>
          </div>
          <div className="w-full rounded-lg bg-white shadow  sm:max-w-md md:mt-0 xl:p-0">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900">
                    Your email
                  </label>
                  <input
                    type="email"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <Link
                    to={"/register"}
                    className="font-medium text-red-600 hover:underline dark:text-red-500"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
