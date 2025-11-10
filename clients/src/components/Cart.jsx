import axios from "axios";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import ModalPayment from "./ModalPayment";

export default function Cart() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [customerName, setCustomerName] = useState("");

  const BASE_URL = "http://localhost:5000";

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Klik tombol Bayar Sekarang => buka pop-up
  const handlePayClick = () => {
    if (cart.length === 0) {
      alert("Keranjang masih kosong!");
      return;
    }
    setShowModal(true);
  };

  // Kirim transaksi ke backend
  const handleConfirmPayment = async () => {
    if (!customerName.trim()) {
      alert("Masukkan nama pelanggan terlebih dahulu!");
      return;
    }

    setLoading(true);

    const payload = {
      items: cart.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
      total_amount: total,
      customer_name: customerName,
    };

    try {
      const res = await axios.post(`${BASE_URL}/transactions`, payload);
      if (res.status === 201) {
        alert(`✅ Transaksi berhasil disimpan atas nama ${customerName}!`);
        clearCart();
        setCustomerName("");
        setShowModal(false);
      } else {
        alert("Terjadi kesalahan saat menyimpan transaksi.");
      }
    } catch (error) {
      console.error("Error saat kirim transaksi:", error);
      alert("Gagal menyimpan transaksi. Periksa koneksi atau backend kamu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="w-full md:w-1/3 bg-white rounded-xl shadow-md flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Keranjang</h2>
      </div>

      {/* Daftar Produk */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scroll">
        {cart.length === 0 ? (
          <div className="text-center text-gray-500 py-8">Keranjang kosong</div>
        ) : (
          cart.map((it) => (
            <div
              key={`${it.type}-${it.id}`}
              className="flex justify-between items-center border-b border-gray-100 pb-2"
            >
              <div>
                <p className="font-medium text-gray-800">{it.name}</p>
                <p className="text-sm text-gray-500">
                  Rp {it.price.toLocaleString()} x {it.quantity}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => decreaseQuantity(it.id, it.type)}
                  className="px-2 bg-gray-200 hover:bg-gray-300 rounded"
                >
                  -
                </button>
                <span className="w-6 text-center">{it.quantity}</span>
                <button
                  onClick={() => increaseQuantity(it.id, it.type)}
                  className="px-2 bg-gray-200 hover:bg-gray-300 rounded"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(it.id, it.type)}
                  className="text-red-500 hover:text-red-700 ml-2 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Total & Tombol Bayar */}
      <div className="border-t border-gray-200 p-4 bg-white sticky bottom-0">
        <div className="flex justify-between font-semibold text-gray-800 mb-3">
          <span>Total Pembayaran:</span>
          <span>Rp {total.toLocaleString()}</span>
        </div>

        <button
          onClick={handlePayClick}
          disabled={loading}
          className={`${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          } text-white w-full py-2 rounded-md transition cursor-pointer`}
        >
          {loading ? "Memproses..." : "Bayar Sekarang"}
        </button>
      </div>

      {/* Modal Pop-up Konfirmasi */}
      {showModal && (
        <ModalPayment
          customerName={customerName}
          onChangeCustomer={(e) => setCustomerName(e.target.value)}
          cart={cart}
          totalPayment={total}
          onClickModal={() => setShowModal(false)}
          onConfirmPayment={handleConfirmPayment}
          loading={loading}
        />
      )}
    </aside>
  );
}
