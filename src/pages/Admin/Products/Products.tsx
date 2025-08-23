import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import AddProductModal from "../../../components/Dashboard/ProductsPage/AddProductModal/AddProductModal";

const Products = () => {
    const [isAddproductModalOpen, setIsAddProductModalOpen] = useState<boolean>(false);
  return (
    <div>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Products</h1>
          <p className="text-gray-600">Manage your products</p>
        </div>

          <button
            onClick={() => setIsAddProductModalOpen(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center gap-2 transition-colors cursor-pointer">
            <FiPlus className="w-5 h-5" />
            Add Product
          </button>
      </div>

      {/* Add Area Modal */}
      <AddProductModal
        isOpen={isAddproductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
      />
    </div>
  );
};

export default Products;
