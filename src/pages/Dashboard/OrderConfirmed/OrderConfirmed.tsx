import { FiCheckCircle, FiDownload, FiShare2, FiArrowLeft } from 'react-icons/fi';

const OrderConfirmed = () => {
  const orderDetails = {
    id: '12345',
    shop: 'The Corner Store',
    area: 'Downtown',
    date: '2023-11-15',
    status: 'Completed',
    paymentMethod: 'Cash',
    paymentDate: '2023-11-15 14:30'
  };

  const orderItems = [
    { id: 1, name: 'Organic Apples', quantity: 5, price: 2.50, total: 12.50 },
    { id: 2, name: 'Whole Wheat Bread', quantity: 2, price: 3.00, total: 6.00 },
    { id: 3, name: 'Almond Milk', quantity: 3, price: 4.00, total: 12.00 }
  ];

  // Calculate totals
  const subtotal = orderItems.reduce((sum, item) => sum + item.total, 0);
  const gstRate = 0.18;
  const gstAmount = subtotal * gstRate;
  const totalAmount = subtotal + gstAmount;

  const handleDownloadInvoice = () => {
    // Implement invoice download functionality
    console.log('Downloading invoice...');
    // This would typically generate a PDF and trigger download
  };

  const handleShareWhatsApp = () => {
    // Implement WhatsApp sharing functionality
    const message = `Invoice for Order #${orderDetails.id}\nShop: ${orderDetails.shop}\nTotal: ₹${totalAmount.toFixed(2)}\nDate: ${orderDetails.date}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleBackToOrders = () => {
    // Navigate back to orders list
    console.log('Going back to orders');
    // Typically you would use: navigate('/orders');
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
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
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h1>
        <p className="text-gray-600 mb-4">
          Your order has been successfully processed and payment has been received.
        </p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 inline-block">
          <p className="text-green-700 font-medium">
            Order ID: <span className="font-bold">{orderDetails.id}</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Shop Name</h3>
                <p className="text-lg font-semibold text-gray-800">{orderDetails.shop}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Area</h3>
                <p className="text-lg font-semibold text-gray-800">{orderDetails.area}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Order Date</h3>
                <p className="text-lg font-semibold text-gray-800">{orderDetails.date}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Payment Method</h3>
                <p className="text-lg font-semibold text-gray-800">{orderDetails.paymentMethod}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Payment Date</h3>
                <p className="text-lg font-semibold text-gray-800">{orderDetails.paymentDate}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <p className="text-lg font-semibold text-green-600">{orderDetails.status}</p>
              </div>
            </div>

            {/* Order Items */}
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="pb-3 text-left text-sm font-medium text-gray-500">Product</th>
                    <th className="pb-3 text-center text-sm font-medium text-gray-500">Quantity</th>
                    <th className="pb-3 text-right text-sm font-medium text-gray-500">Price</th>
                    <th className="pb-3 text-right text-sm font-medium text-gray-500">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100">
                      <td className="py-4 text-sm font-medium text-gray-800">{item.name}</td>
                      <td className="py-4 text-center text-sm text-gray-600">{item.quantity}</td>
                      <td className="py-4 text-right text-sm text-gray-600">₹{item.price.toFixed(2)}</td>
                      <td className="py-4 text-right text-sm font-medium text-gray-800">₹{item.total.toFixed(2)}</td>
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
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Invoice Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">₹{subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">GST (18%):</span>
                <span className="font-medium">₹{gstAmount.toFixed(2)}</span>
              </div>
              
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total Amount:</span>
                  <span className="text-green-600">₹{totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleDownloadInvoice}
                className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-medium"
              >
                <FiDownload className="w-5 h-5" />
                Download Invoice
              </button>
              
              <button
                onClick={handleShareWhatsApp}
                className="w-full flex items-center justify-center gap-2 border border-green-600 text-green-600 py-3 rounded-lg hover:bg-green-50 font-medium"
              >
                <FiShare2 className="w-5 h-5" />
                Share via WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmed;