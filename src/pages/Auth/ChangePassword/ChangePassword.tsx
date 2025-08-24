/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import TextInput from "../../../components/Reusable/TextInput/TextInput";
import { useChangePasswordMutation } from "../../../redux/Features/Auth/authApi";
import Button from "../../../components/Reusable/Button/Button";
import { toast } from "sonner";

type FormValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const ChangePassword = () => {
  const [changePassword, { isLoading: isChangingPassword }] =
    useChangePasswordMutation();
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

  const handleResetPassword = async (data: FormValues) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    try {
      await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      }).unwrap();

      toast.success("Password changed successfully!");
      reset();
    } catch (error: any) {
      console.error("Change password error:", error);
      const message =
        error?.data?.message || "Failed to change password. Please try again.";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-Nunito">
      <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden w-full max-w-md">
        <form
          className="space-y-4 py-5 lg:py-8 px-4 lg:px-8"
          onSubmit={handleSubmit(handleResetPassword)}
        >
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-5">
            Change Password
          </h1>

          {/* Current Password */}
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
              className="absolute right-3 top-[50px] text-green-600 dark:text-green-300 text-lg font-medium hover:text-green-800 dark:hover:text-green-100 transition-colors"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              {showCurrentPassword ? (
                <AiOutlineEyeInvisible />
              ) : (
                <AiOutlineEye />
              )}
            </button>
          </div>

          {/* New Password */}
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
              className="absolute right-3 top-[50px] text-green-600 dark:text-green-300 text-lg font-medium hover:text-green-800 dark:hover:text-green-100 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>

          {/* Confirm Password */}
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
              className="absolute right-3 top-[50px] text-green-600 dark:text-green-300 text-lg font-medium hover:text-green-800 dark:hover:text-green-100 transition-colors"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>

          {/* Submit Button */}
          <Button label="Change Password" isLoading={isChangingPassword} />
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
