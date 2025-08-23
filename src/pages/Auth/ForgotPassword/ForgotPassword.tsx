import { useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../../../components/Reusable/TextInput/TextInput";

type FormValues = {
  email: string;
};

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();
  const [isLoading, setIsLoading] = useState(false);

  const handleSendEmail = (data: FormValues) => {
    setIsLoading(true);
    setTimeout(() => {
      console.log("Send reset email to:", data.email);
      reset();
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4 relative overflow-hidden font-Nunito">
      <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden w-full max-w-md border border-green-200 dark:border-green-700">
        <div className="bg-gradient-to-r from-green-400 to-green-600 dark:from-green-700 dark:to-green-800 py-8 px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-1 md:mb-2">
            Forgot Password?
          </h2>
          <p className="text-green-100 dark:text-green-200">
            Enter your email to receive a reset link
          </p>
        </div>

        <form className="space-y-4 py-8 px-8" onSubmit={handleSubmit(handleSendEmail)}>
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

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 dark:from-green-700 dark:to-green-800 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
