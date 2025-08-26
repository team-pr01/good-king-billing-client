/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import Modal from "../../../Reusable/Modal/Modal";
import TextInput from "../../../Reusable/TextInput/TextInput";
import { useForm } from "react-hook-form";
import { useUpdateOrderMutation } from "../../../../redux/Features/Order/orderApi";

type ProceedToPaymentModalProps = {
  orderId: any;
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
  onPaymentSuccess: (paymentData: any) => void;
  dueAmount : number,
};

type PaymentMethod = "cash" | "online" | "partial" | "";

type FormValues = {
  totalAmount: string;
  paidAmount: string;
  dueAmount: string;
};

const ProceedToPaymentModal: React.FC<ProceedToPaymentModalProps> = ({
  orderId,
  isOpen,
  onClose,
  totalAmount,
  onPaymentSuccess,
  dueAmount : pendingAmount
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>();

  console.log(pendingAmount);

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("");
  const [paidAmount, setPaidAmount] = useState<string>("");
  const [dueAmount, setDueAmount] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate due amount whenever paidAmount or totalAmount changes
  useEffect(() => {
    const paid = parseFloat(paidAmount) || 0;
    const calculatedDue = pendingAmount - paid;
    console.log(totalAmount);
    setDueAmount(calculatedDue);
    setValue("dueAmount", Number(pendingAmount).toFixed(2).toString());
  }, [paidAmount, totalAmount]);

   const [updateOrder] = useUpdateOrderMutation();

  const handlePayment = async () => {
    try{
      const payload = {
        totalAmount,
        paymentMethod: selectedMethod,
        paidAmount: parseFloat(paidAmount) || 0,
        pendingAmount : dueAmount,
      }
      const response = await updateOrder({id:orderId, data:payload}).unwrap();
      console.log(response);
    } catch(error){
      console.log(error);
    }
  };

  const handleClose = () => {
    setSelectedMethod("");
    setPaidAmount("");
    setDueAmount(0);
    onClose();
  };

  const handlePaidAmountChange = (value: string) => {
    // Allow only numbers and decimal point
    if (/^\d*\.?\d*$/.test(value)) {
      setPaidAmount(value);
    }
  };

  return (
    <Modal title="Select Payment Method" isOpen={isOpen} onClose={handleClose}>
      <div className="space-y-6">
        {/* Payment Methods */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-700">
            Select Payment Method:
          </h3>

          <div className="grid grid-cols-1 gap-2">
            {/* Cash Payment */}
            <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={selectedMethod === "cash"}
                onChange={() => {
                  setSelectedMethod("cash");
                  setPaidAmount(totalAmount.toString());
                }}
                className="h-4 w-4 text-green-600 focus:ring-green-500"
              />
              <div className="ml-3">
                <span className="block text-sm font-medium text-gray-700">
                  Cash Payment
                </span>
                <span className="block text-sm text-gray-500">
                  Pay with cash
                </span>
              </div>
            </label>

            {/* Online Payment */}
            <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="paymentMethod"
                value="online"
                checked={selectedMethod === "online"}
                onChange={() => {
                  setSelectedMethod("online");
                  setPaidAmount(totalAmount.toString());
                }}
                className="h-4 w-4 text-green-600 focus:ring-green-500"
              />
              <div className="ml-3">
                <span className="block text-sm font-medium text-gray-700">
                  Online Payment
                </span>
                <span className="block text-sm text-gray-500">
                  Pay with card/UPI/bank transfer
                </span>
              </div>
            </label>

            {/* Partial Payment */}
            <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="paymentMethod"
                value="partial"
                checked={selectedMethod === "partial"}
                onChange={() => {
                  setSelectedMethod("partial");
                  setPaidAmount("");
                }}
                className="h-4 w-4 text-green-600 focus:ring-green-500"
              />
              <div className="ml-3">
                <span className="block text-sm font-medium text-gray-700">
                  Partial Payment
                </span>
                <span className="block text-sm text-gray-500">
                  Pay a portion of the total amount
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Payment Details - Show for all payment methods */}
        {selectedMethod && (
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700">
              Payment Details:
            </h3>

            <div className="grid grid-cols-1 gap-3">
              {/* Total Amount (Disabled) */}
              <TextInput
                label="Total Amount"
                {...register("totalAmount")}
                value={`₹${totalAmount.toFixed(2)}`}
                isDisabled={true}
                isRequired={false}
              />

              {/* Paid Amount (Enabled) */}
              <TextInput
                label="Paid Amount(₹)"
                type="number"
                {...register("paidAmount")}
                onChange={(e) => handlePaidAmountChange(e.target.value)}
                placeholder="Enter paid amount"
                // error={error}
              />

              {/* Due Amount (Disabled) */}
              <TextInput
                label="Due Amount(₹)"
                type="number"
                {...register("dueAmount")}
                isDisabled={true}
                isRequired={false}
              />
            </div>

            {dueAmount > 0 && (
              <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-700">
                  <span className="font-medium">Note:</span> This will be marked
                  as a partial payment. The remaining amount of ₹
                  {dueAmount.toFixed(2)} will be due.
                </p>
              </div>
            )}

            {/* {dueAmount === 0 && selectedMethod && (
              <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-700">
                  <span className="font-medium">Payment Complete:</span> The
                  full amount has been paid.
                </p>
              </div>
            )} */}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handlePayment}
            // disabled={isPaymentDisabled || isProcessing}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isProcessing ?
            <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                Processing...
              </span>
              :
              "Submit Payment"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ProceedToPaymentModal;
