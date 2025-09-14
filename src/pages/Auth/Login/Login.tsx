/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import TextInput from "../../../components/Reusable/TextInput/TextInput";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useLoginMutation } from "../../../redux/Features/Auth/authApi";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { setUser } from "../../../redux/Features/Auth/authSlice";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin: SubmitHandler<FormValues> = async (data) => {
    const loginData = {
      email: data.email,
      password: data.password,
    };
    try {
      const res = await login(loginData).unwrap();
      reset();
      const user = res?.data?.user;
      const token = res?.data?.accessToken;
      toast.success("Logged in successfully.");

      // Setting the user in Redux state
      dispatch(setUser({ user, token }));
      navigate(
        res?.data?.user?.role === "admin"
          ? "/admin/dashboard"
          : res.data.user.role === "salesperson"
          ? "/salesperson/dashboard"
          : "/supplier/dashboard"
      );
    } catch (err) {
      toast.error("Invalid email or password!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4 relative overflow-hidden font-Nunito">
      {/* Background bubbles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-20 right-0 w-56 h-56 bg-green-300 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-10 w-64 h-64 bg-green-300 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative bg-white  rounded-3xl shadow-2xl overflow-hidden w-full max-w-md border border-green-200">
        <div className="bg-gradient-to-r from-green-400 to-green-600 py-8 px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-1 md:mb-2">
            Welcome Back
          </h2>
          <p className="text-green-1000">
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
              className="cursor-pointer absolute right-3 top-[50px] text-green-600 text-lg font-medium hover:text-green-800 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
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

        {/* <div className="bg-green-50 py-4 px-8 border-t border-green-100 text-center">
          <Link
            to={"/forgot-password"}
            className="text-green-7000 text-sm font-semibold"
          >
            Forgot password?
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
