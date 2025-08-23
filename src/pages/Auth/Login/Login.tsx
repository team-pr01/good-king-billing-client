import { useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../../../components/Reusable/TextInput/TextInput";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (data: FormValues) => {
    setIsLoading(true);
    setTimeout(() => {
      console.log("Login data:", data);
      reset();
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4 relative overflow-hidden font-Nunito">
      {/* Background bubbles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-20 right-0 w-56 h-56 bg-green-300 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-10 w-64 h-64 bg-green-300 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden w-full max-w-md border border-green-200 dark:border-green-700">
        <div className="bg-gradient-to-r from-green-400 to-green-600 dark:from-green-700 dark:to-green-800 py-8 px-8 text-center">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-1 md:mb-2">
            Welcome Back
          </h2>
          <p className="text-green-100 dark:text-green-200">
            Sign in to your account
          </p>
        </div>

        <form
          className="space-y-4 py-5 lg:py-8 px-4 lg:px-8"
          onSubmit={handleSubmit(handleLogin)}
        >
          <TextInput
            label="Email"
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            error={errors.email}
          />

          <div className="relative">
            <TextInput
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              error={errors.password}
            />
            <button
              type="button"
              className="absolute right-3 top-12 text-green-600 dark:text-green-300 text-sm font-medium hover:text-green-800 dark:hover:text-green-100 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 dark:from-green-700 dark:to-green-800 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
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
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <div className="bg-green-50 dark:bg-gray-700 py-4 px-8 border-t border-green-100 dark:border-green-700 text-center">
          <p className="text-green-700 dark:text-green-200 text-sm font-semibold">
            Forgot password?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
