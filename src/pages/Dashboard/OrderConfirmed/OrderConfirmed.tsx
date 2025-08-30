/* eslint-disable @typescript-eslint/no-explicit-any */
import { pdf } from "@react-pdf/renderer";
import {
  FiCheckCircle,
  FiDownload,
  FiShare2,
  FiArrowLeft,
} from "react-icons/fi";
import Invoice from "../../../components/Dashboard/Invoice/Invoice";
import { useParams } from "react-router-dom";
import { useGetSingleOrderByIdQuery } from "../../../redux/Features/Order/orderApi";
import Loader from "../../../components/Reusable/Loader/Loader";

const OrderConfirmed = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleOrderByIdQuery(id);
  console.log(data);

  // Calculate totals
  const totalAmount = data?.data?.products?.reduce(
    (sum: any, item: any) => sum + (item.price + item.taxValue) * item.quantity,
    0
  );

  const invoiceData = {
    invoiceNumber: data?.data?._id,
    date: new Date(data?.data?.createdAt).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    customerName: data?.data?.shopId?.name,
    businessEmail: data?.data?.shopId?.email,
    businessPhone: data?.data?.shopId?.phoneNumber,
    businessAddress: `${data?.data?.shopId?.city}, ${data?.data?.shopId?.area}, ${data?.data?.shopId?.district}, ${data?.data?.shopId?.state}, ${data?.data?.shopId?.pinCode}`,
    businessName: data?.data?.shopId?.shopName,
    items: data?.data?.products,
    status: data?.data?.pendingAmount > 0 ? "Due" : "Paid",
    dueAmount: data?.data?.pendingAmount,
    previousOrderId: data?.data?.previousOrderId,
    subtotal: totalAmount,
    coveredDueAmount: data?.data?.coveredDueAmount,
  };

  const handleDownload = async () => {
    // Create the PDF instance
    const blob = await pdf(<Invoice data={invoiceData} />).toBlob();

    // Create a temporary link to trigger download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `invoice_${invoiceData.invoiceNumber}.pdf`;
    link.click();

    // Clean up
    URL.revokeObjectURL(link.href);
  };

  const handleShareWhatsApp = async () => {
    if (!invoiceData.businessPhone) {
      alert("Business phone not available");
      return;
    }

    const phone = invoiceData.businessPhone.replace(/\D/g, "");

    const message = `Invoice #${invoiceData.invoiceNumber}
Shop Owner: ${invoiceData.customerName}
Business Name: ${invoiceData.businessName}
Total Price: ₹${invoiceData.subtotal?.toFixed(2)}
Due Amount: ₹${invoiceData.dueAmount?.toFixed(2)}
Date: ${invoiceData.date}`;

    const whatsappUrl = `https://wa.me/+91${phone}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleBackToOrders = () => {
    // Navigate back to orders list
    console.log("Going back to orders");
    // Typically you would use: navigate('/orders');
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={handleBackToOrders}
          className="flex items-center text-gray-600 hover:text-gray-800 mr-4"
        >
          <FiArrowLeft className="w-5 h-5 mr-1" />
          Back to Orders
        </button>
      </div>

      {/* Success Message */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6 text-center">
        <div className="flex justify-center mb-4">
          <FiCheckCircle className="w-16 h-16 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Order Confirmed!
        </h1>
        <p className="text-gray-600 mb-4">
          Your order has been successfully processed and payment has been
          received.
        </p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 inline-block">
          <p className="text-green-700 font-medium">
            Order ID: <span className="font-bold">{id}</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Order Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Shop Name</h3>
                <p className="text-lg font-semibold text-gray-800">
                  {data?.data?.shopId?.shopName}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Area</h3>
                <p className="text-lg font-semibold text-gray-800">
                  {data?.data?.shopId?.area}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Order Date
                </h3>
                <p className="text-lg font-semibold text-gray-800">
                  {new Date(data?.data?.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Payment Method
                </h3>
                <p className="text-lg font-semibold text-gray-800 capitalize">
                  {data?.data?.paymentMethod}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Payment Date
                </h3>
                <p className="text-lg font-semibold text-gray-800">
                  {new Date(data?.data?.updatedAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <p className="text-lg font-semibold text-green-600 capitalize">
                  {data?.data?.status}
                </p>
              </div>
            </div>

            {/* Order Items */}
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Order Summary
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="pb-3 text-left text-sm font-medium text-gray-500">
                      Product
                    </th>
                    <th className="pb-3 text-center text-sm font-medium text-gray-500">
                      Quantity
                    </th>
                    <th className="pb-3 text-right text-sm font-medium text-gray-500">
                      Price
                    </th>
                    <th className="pb-3 text-right text-sm font-medium text-gray-500">
                      Cax Value
                    </th>
                    <th className="pb-3 text-right text-sm font-medium text-gray-500">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data?.products?.map((item: any) => (
                    <tr key={item.id} className="border-b border-gray-100">
                      <td className="py-4 text-sm font-medium text-gray-800">
                        {item?.name}
                      </td>
                      <td className="py-4 text-center text-sm text-gray-600">
                        {item?.quantity}
                      </td>
                      <td className="py-4 text-right text-sm text-gray-600">
                        ₹{item?.price}
                      </td>
                      <td className="py-4 text-right text-sm text-gray-600">
                        ₹{item?.taxValue}
                      </td>
                      <td className="py-4 text-right text-sm font-medium text-gray-800">
                        ₹{item.price * item.quantity + item.taxValue}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Invoice Summary & Actions */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Invoice Summary
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">₹{totalAmount}</span>
              </div>

              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total Amount:</span>
                  <span className="text-green-600">₹{totalAmount}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleDownload}
                className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-medium cursor-pointer"
              >
                <FiDownload className="w-5 h-5" />
                Download Invoice
              </button>

              <button
                onClick={handleShareWhatsApp}
                className="w-full flex items-center justify-center gap-2 border border-green-600 text-green-600 py-3 rounded-lg hover:bg-green-50 font-medium cursor-pointer"
              >
                <FiShare2 className="w-5 h-5" />
                Share Invoice via WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmed;
