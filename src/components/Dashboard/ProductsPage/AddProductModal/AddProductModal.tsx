import React from "react";
import { useForm } from "react-hook-form";
import TextInput from "../../../Reusable/TextInput/TextInput";
import Modal from "../../../Reusable/Modal/Modal";

type FormValues = {
  productName: string;
  availableStock: number;
  price: number;
  description?: string;
};

type AddProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log("Product data:", data);
    // Handle form submission here
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal title="Add New Product" isOpen={isOpen} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          {/* Product Name */}
          <TextInput
            label="Product Name"
            placeholder="Enter product name"
            {...register("productName", {
              required: "Product name is required",
              minLength: {
                value: 2,
                message: "Product name must be at least 2 characters",
              },
            })}
            error={errors.productName}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Available Stock */}
            <TextInput
              label="Available Stock"
              type="number"
              placeholder="Enter available stock"
              {...register("availableStock", {
                required: "Available stock is required",
                min: {
                  value: 0,
                  message: "Stock cannot be negative",
                },
                valueAsNumber: true,
              })}
              error={errors.availableStock}
            />

            {/* Price */}
            <TextInput
              label="Price(₹)"
              type="number"
              placeholder="Enter price"
              {...register("price", {
                required: "Price is required",
                min: {
                  value: 0.01,
                  message: "Price must be greater than 0",
                },
                valueAsNumber: true,
              })}
              error={errors.price}
            />
          </div>
        </div>

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
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 cursor-pointer transition-colors"
          >
            Add Product
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddProductModal;
