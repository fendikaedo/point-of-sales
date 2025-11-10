import { useState } from "react";
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import ModalCreate from "./components/ModalCreate";
import { CartProvider } from "./context/CartContext";
import ModalDetail from "./components/modals/ModalDetail";

export default function App() {
  const [activeTab, setActiveTab] = useState("makanan");
  const [isModalOpenCreateProduct, setIsModalOpenCreateProduct] =
    useState(false);
  const [isModalOpenDetailTransaction, setIsModalOpenDetailTransaction] =
    useState(false);

  return (
    <CartProvider>
      <div className="w-full md:h-screen flex flex-col bg-gray-50 text-gray-800 overflow-y-auto md:overflow-hidden">
        {/* Header */}
        <Header />

        {/* Tabs */}
        <Tabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenModalDetail={() => setIsModalOpenDetailTransaction(true)}
        />

        {/* Main Content */}
        <main className="flex flex-col md:flex-row grow gap-6 p-4 max-w-7xl mx-auto w-full bg-neutral-100 flex-1 overflow-y-auto">
          <ProductList
            activeTab={activeTab}
            onOpenModalCreate={() => setIsModalOpenCreateProduct(true)}
            onOpenModalDetail={() => setIsModalOpenDetailTransaction(true)}
          />
          <Cart />
        </main>

        {/* Modal Create Product */}
        {isModalOpenCreateProduct && (
          <ModalCreate
            activeTab={activeTab}
            onClose={() => setIsModalOpenCreateProduct(false)}
          />
        )}

        {/* Modal Detail Transaction */}
        {isModalOpenDetailTransaction && (
          <ModalDetail
            activeTab={activeTab}
            onClose={() => setIsModalOpenDetailTransaction(false)}
          />
        )}
      </div>
    </CartProvider>
  );
}
