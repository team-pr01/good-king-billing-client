import { useForm } from "react-hook-form";
import Modal from "../../../Reusable/Modal/Modal";
import TextInput from "../../../Reusable/TextInput/TextInput";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { useAddUserMutation } from "../../../../redux/Features/User/userApi";

type FormValues = {
  name: string;
  email?: string;
  phoneNumber: string;
  role: string;
  password: string;
};

type AddProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AddUserModal = ({ isOpen, onClose }: AddProductModalProps) => {
  const [addUser, {isLoading}] = useAddUserMutation();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit = async(data: FormValues) => {
    try {
      const payload = {
        ...data
      }
      const response = await addUser(payload).unwrap();
      if(response?.success){
        reset();
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const roles = [
    {
      label: "Admin",
      value: "admin",
    },
    {
      label: "Salesman",
      value: "salesman",
    },
    {
      label: "Supplier",
      value: "supplier",
    },
  ];

  if (!isOpen) return null;
  return (
    <Modal title="Add New User" isOpen={isOpen} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          {/* User Name */}
          <TextInput
            label="User Name"
            placeholder="Enter user name"
            {...register("name")}
            error={errors.name}
          />

          {/* Email (optional) */}
          <TextInput
            label="Email"
            type="email"
            placeholder="Enter email"
            {...register("email", {
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
            error={errors.email}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            {/* Phone Number */}
            <TextInput
              label="Phone Number"
              type="tel"
              placeholder="Enter phone number"
              {...register("phoneNumber")}
              error={errors.phoneNumber}
            />

            {/* Role Dropdown */}
            {/* Area */}
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-medium text-gray-700">
                Role <span className="text-red-600"> *</span>
              </label>
              <select
                {...register("role", { required: "Role is required" })}
                className="bg-neutral-50 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select Area</option>
                {roles.map((role, index) => (
                  <option key={index} value={role?.value}>
                    {role?.label}
                  </option>
                ))}
              </select>
              {errors.role && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.role.message}
                </p>
              )}
            </div>
          </div>

          {/* Password */}
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
              className="cursor-pointer absolute right-3 top-[50px] text-green-600 dark:text-green-300 text-lg font-medium hover:text-green-800 dark:hover:text-green-100 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 cursor-pointer transition-colors flex items-center gap-2"
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
               Loading...
              </>
            ) : (
              "Add User"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddUserModal;
