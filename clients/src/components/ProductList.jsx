import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import ButtonCreate from "./buttons/ButtonCreate";
import LoadingBuffer from "./utils/LoadingBuffer";

export default function ProductList({ activeTab, onOpenModalCreate }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = "http://localhost:5000";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/products`);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Gagal memuat data produk");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filtered = products.filter((p) => p.type === activeTab);

  return (
    <section className="md:flex-1 bg-white rounded-xl p-4 shadow-sm flex flex-col md:h-full overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-2">
        <h2 className="text-lg font-semibold">
          Daftar {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </h2>
        <div className="flex items-center gap-2">
          <ButtonCreate onOpenModal={onOpenModalCreate}>
            {activeTab}
          </ButtonCreate>
        </div>
      </div>

      {/* Loading state */}
      {loading ? (
        <LoadingBuffer />
      ) : error ? (
        <p className="p-4 text-red-500">{error}</p>
      ) : (
        <div className="grid md:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto pr-2 custom-scroll">
          {filtered.length > 0 ? (
            filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              Belum ada data produk.
            </p>
          )}
        </div>
      )}
    </section>
  );
}
