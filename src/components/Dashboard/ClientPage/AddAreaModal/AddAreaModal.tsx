/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../../../Reusable/TextInput/TextInput";
import Modal from "../../../Reusable/Modal/Modal";
import {
  useAddAreaMutation,
  useUpdateAreaMutation,
} from "../../../../redux/Features/Area/areaApi";
import Button from "../../../Reusable/Button/Button";
import Loader from "../../../Reusable/Loader/Loader";

type FormValues = {
  state: string;
  district: string;
  city: string;
  area: string;
};

type AddAreaModalProps = {
  isOpen: boolean;
  onClose: () => void;
  defaultValues?: any;
  isLoading?: boolean;
  modalType?: string | null;
};

// Sample data for states and districts
const states: string[] = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
];

const AddAreaModal: React.FC<AddAreaModalProps> = ({
  isOpen,
  onClose,
  defaultValues,
  isLoading,
  modalType,
}) => {
  const [addArea, { isLoading: isAdding }] = useAddAreaMutation();
  const [updateArea, { isLoading: isUpdating }] = useUpdateAreaMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormValues>();


  useEffect(() => {
    if (defaultValues) {
      setValue("state", defaultValues.state);
      setValue("district", defaultValues.district);
      setValue("city", defaultValues.city);
      setValue("area", defaultValues.area);
    }
  }, [defaultValues, setValue]);

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const state = e.target.value;
    setValue("state", state);
    setValue("district", "");
  };

  const onSubmit = async (data: FormValues) => {
    try {
      const payload = {
        ...data,
      };

      if (modalType === "add") {
        const response = await addArea(payload).unwrap();
        if (response?.success) {
          reset();
          onClose();
        }
      } else {
        const response = await updateArea({
          id: defaultValues?._id,
          data: payload,
        }).unwrap();
        if (response?.success) {
          reset();
          onClose();
        }
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
    <Modal title="Add New Area" isOpen={isOpen} onClose={handleClose}>
      <div className="h-full">
        {isLoading ? (
          <Loader />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              {/* State Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State <span className="text-red-600"> *</span>
                </label>
                <select
                  {...register("state", { required: "State is required" })}
                  onChange={handleStateChange}
                  className="w-full px-[18px] py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Select State</option>
                  {states.map((state, index) => (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {errors.state && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.state.message}
                  </p>
                )}
              </div>

              {/* City Input */}
              <TextInput
                label="District"
                placeholder="Enter district name"
                {...register("district", { required: "District is required" })}
                error={errors.district}
              />

              {/* City Input */}
              <TextInput
                label="City"
                placeholder="Enter city name"
                {...register("city", { required: "City is required" })}
                error={errors.city}
              />

              {/* Area Input */}
              <TextInput
                label="Area"
                placeholder="Enter area name"
                {...register("area", { required: "Area is required" })}
                error={errors.area}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
              >
                Cancel
              </button>
              <Button label="Add Area" isLoading={isAdding || isUpdating} />
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
};

export default AddAreaModal;
