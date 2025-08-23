import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import TextInput from "../../../components/Reusable/TextInput/TextInput";

type FormValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormValues>();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = (data: FormValues) => {
    setIsLoading(true);
    setTimeout(() => {
      console.log("New password:", data.newPassword);
      reset();
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-Nunito">
      <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden w-full max-w-md">
        <form
          className="space-y-4 py-5 lg:py-8 px-4 lg:px-8"
          onSubmit={handleSubmit(handleResetPassword)}
        >
          <div className="relative">
            <TextInput
              label="Current Password"
              type={showCurrentPassword ? "text" : "password"}
              placeholder="Enter your current password"
              {...register("currentPassword", {
                required: "Current password is required",
                minLength: { value: 6, message: "At least 6 characters" },
              })}
              error={errors.currentPassword}
            />
            <button
              type="button"
              className="cursor-pointer absolute right-3 top-[50px] text-green-600 dark:text-green-300 text-lg font-medium hover:text-green-800 dark:hover:text-green-100 transition-colors"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>
          <div className="relative">
            <TextInput
              label="New Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              {...register("newPassword", {
                required: "New password is required",
                minLength: { value: 6, message: "At least 6 characters" },
              })}
              error={errors.newPassword}
            />
            <button
              type="button"
              className="cursor-pointer absolute right-3 top-[50px] text-green-600 dark:text-green-300 text-lg font-medium hover:text-green-800 dark:hover:text-green-100 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>

          <div className="relative">
            <TextInput
              label="Confirm Password"
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm new password"
              {...register("confirmPassword", {
                required: "Confirm your password",
                validate: (value) =>
                  value === watch("newPassword") || "Passwords do not match",
              })}
              error={errors.confirmPassword}
            />
            <button
              type="button"
              className="cursor-pointer absolute right-3 top-[50px] text-green-600 dark:text-green-300 text-lg font-medium hover:text-green-800 dark:hover:text-green-100 transition-colors"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 dark:from-green-700 dark:to-green-800 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
