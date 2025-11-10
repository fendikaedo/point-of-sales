import { useEffect, useState } from "react";
import axios from "axios";

export default function ModalDetail({ onClose }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = "http://localhost:5000";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/transactions`);
        setTransactions(res.data);
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setError("Gagal memuat data transaction");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 md:w-3/4 sm:w-96 shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Detail Pesanan
        </h2>
        {loading ? (
          <div className="flex justify-center items-center flex-1">
            <div className="flex flex-col items-center text-gray-500">
              <svg
                className="animate-spin h-6 w-6 mb-2 text-blue-600"
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
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 000 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                ></path>
              </svg>
              <p className="text-sm">Memuat data produk...</p>
            </div>
          </div>
        ) : error ? (
          <p className="p-4 text-red-500">{error}</p>
        ) : (
          <section className="flex flex-col gap-3">
            <table className="w-full text-sm text-left">
              <thead className="bg-blue-300 text-gray-700 font-medium">
                <tr>
                  <th className="px-2 py-1">No</th>
                  <th className="px-2 py-1">Pelanggan</th>
                  <th className="px-2 py-1 text-center">Total Pembayaran</th>
                  <th className="px-2 py-1 text-center">Tanggal Pembayaran</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((item, index) => (
                  <tr key={item.id} className="border-t text-gray-600">
                    <td className="px-2 py-1">{index + 1}</td>
                    <td className="px-2 py-1">{item.customer_name}</td>
                    <td className="px-2 py-1 text-center">
                      Rp {item.total_amount.toLocaleString()}
                    </td>
                    <td className="px-2 py-1 text-center">
                      {new Date(item.date).toISOString().split("T")[0]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 cursor-pointer"
            disabled={loading}
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
