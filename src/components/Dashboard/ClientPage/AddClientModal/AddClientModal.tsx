import React from "react";
import { useForm } from "react-hook-form";
import TextInput from "../../../Reusable/TextInput/TextInput";
import Modal from "../../../Reusable/Modal/Modal";
import { useAddClientMutation } from "../../../../redux/Features/Client/clientApi";

type FormValues = {
  name: string;
  email: string;
  phoneNumber: string;
  shopName: string;
  gstNumber: string;
  area: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  city: string;
  district: string;
  pinCode: string;
  state: string;
};

type AddClientModalProps = {
  isOpen: boolean;
  onClose: () => void;
  areas: string[];
};

const AddClientModal: React.FC<AddClientModalProps> = ({
  isOpen,
  onClose,
  areas,
}) => {
  const [addClient, { isLoading: isAdding }] = useAddClientMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      const payload = {
        ...data,
      };

      const response = await addClient(payload).unwrap();
      if (response?.success) {
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

  if (!isOpen) return null;

  return (
    <div>
      <Modal title="Add New Client" isOpen={isOpen} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-2">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
              label="Client Name"
              placeholder="Enter client name"
              {...register("name", {
                required: "Client name is required",
              })}
              error={errors.name}
            />

            <TextInput
              label="Email (Optional)"
              type="email"
              placeholder="Enter email address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              error={errors.email}
              isRequired={false}
            />

            <TextInput
              label="Phone Number"
              placeholder="Enter phone number"
              {...register("phoneNumber", {
                required: "Phone number is required",
              })}
              error={errors.phoneNumber}
            />

            <TextInput
              label="Shop Name"
              placeholder="Enter shop name"
              {...register("shopName", { required: "Shop name is required" })}
              error={errors.shopName}
            />
          </div>
          <TextInput
            label="GST Number (Optional)"
            placeholder="Enter GST number"
            {...register("gstNumber")}
            error={errors.gstNumber}
            isRequired={false}
          />

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-2">
              Address Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
              {/* Area */}
              <div className="flex flex-col gap-2">
                <label className="block text-sm font-medium text-gray-700">
                  Area <span className="text-red-600"> *</span>
                </label>
                <select
                  {...register("area", { required: "Area is required" })}
                  className="bg-neutral-50 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Select Area</option>
                  {areas.map((area, index) => (
                    <option key={index} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
                {errors.area && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.area.message}
                  </p>
                )}
              </div>

              {/* Address Line 1 */}
              <TextInput
                label="Address Line 1"
                placeholder="Enter Door Number or building number"
                {...register("addressLine1", {
                  required: "Address Line 1 is required",
                })}
                error={errors.addressLine1}
              />

              {/* Address Line 2 */}
              <TextInput
                label="Address Line 2"
                placeholder="Enter apartment name or building name"
                {...register("addressLine2")}
                error={errors.addressLine2}
                isRequired={false}
              />

              {/* Address Line 3 */}
              <TextInput
                label="Address Line 3"
                placeholder="Enter locality or street"
                {...register("addressLine3")}
                error={errors.addressLine3}
                isRequired={false}
              />

              {/* City */}
              <TextInput
                label="City"
                placeholder="Enter city or district"
                {...register("city", { required: "City is required" })}
                error={errors.city}
              />

              {/* District */}
              <TextInput
                label="District"
                placeholder="Enter district"
                {...register("district", { required: "District is required" })}
                error={errors.district}
              />

              {/* Pincode */}
              <TextInput
                label="Pincode"
                placeholder="Enter pincode"
                {...register("pinCode", {
                  required: "Pincode is required",
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: "Pincode must be 6 digits",
                  },
                })}
                error={errors.pinCode}
              />

              {/* State */}
              <TextInput
                label="State"
                placeholder="Enter state"
                {...register("state", { required: "State is required" })}
                error={errors.state}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isAdding}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 cursor-pointer transition-colors flex items-center gap-2"
            >
              {isAdding ? (
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
                "Add Client"
              )}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddClientModal;
