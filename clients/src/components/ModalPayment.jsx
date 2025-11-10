export default function ModalPayment({
  customerName,
  onChangeCustomer,
  cart = [],
  totalPayment,
  onConfirmPayment,
  loading,
  onClickModal,
}) {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          Konfirmasi Pembayaran
        </h2>

        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nama Pelanggan
          </label>
          <input
            type="text"
            value={customerName}
            onChange={onChangeCustomer}
            placeholder="Masukkan nama pelanggan"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Ringkasan Pembelian */}
        <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-md mb-3">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 font-medium">
              <tr>
                <th className="px-2 py-1">Produk</th>
                <th className="px-2 py-1 text-center">Qty</th>
                <th className="px-2 py-1 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id} className="border-t text-gray-600">
                  <td className="px-2 py-1">{item.name}</td>
                  <td className="px-2 py-1 text-center">{item.quantity}</td>
                  <td className="px-2 py-1 text-right">
                    Rp {(item.price * item.quantity).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between text-gray-800 font-semibold mb-4">
          <span>Total Pembayaran:</span>
          <span>Rp {totalPayment.toLocaleString()}</span>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClickModal}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md text-gray-700"
          >
            Batal
          </button>
          <button
            onClick={onConfirmPayment}
            disabled={loading}
            className={`px-4 py-2 rounded-md text-white cursor-pointer ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Memproses..." : "Konfirmasi Bayar"}
          </button>
        </div>
      </div>
    </div>
  );
}
