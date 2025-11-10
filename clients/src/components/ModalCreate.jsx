import { useState } from "react";
import axios from "axios";

export default function ModalCreate({ activeTab, onClose }) {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle perubahan file
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.target);
      console.log("FormData entries:", Array.from(formData.entries()));
      formData.append("type", activeTab);

      // Tentukan endpoint berdasarkan tab aktif
      const endpoint = "http://localhost:5000/products";

      // Kirim ke backend
      const res = await axios.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200 || res.status === 201) {
        alert(`${activeTab} berhasil ditambahkan!`);
        onClose();
      } else {
        alert("Terjadi kesalahan saat menyimpan data!");
      }
    } catch (err) {
      console.error(err);
      alert("Gagal menambahkan produk. Cek koneksi atau backend Anda.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-11/12 sm:w-96 shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Tambah {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </h2>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          {/* Upload foto */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">
              Upload Foto Produk
            </label>
            <input
              type="file" 
              name="file"
              accept="image/*"
              onChange={handleFileChange}
              className="border rounded-md p-2 focus:ring-2 focus:ring-blue-500 file:mr-3 file:py-1 file:px-4 file:rounded-md file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
            />

            {preview && (
              <div className="mt-3 flex justify-center">
                <img
                  src={preview}
                  alt="Preview Produk"
                  className="w-full h-32 object-cover rounded-md border"
                />
              </div>
            )}
          </div>

          <input
            type="text"
            name="name"
            placeholder={`Nama ${activeTab}`}
            className="border rounded-md p-2 focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Harga"
            className="border rounded-md p-2 focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            name="stock"
            placeholder="Stok"
            className="border rounded-md p-2 focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            name="description"
            placeholder="Deskripsi"
            className="border rounded-md p-2 focus:ring-2 focus:ring-blue-500"
          ></textarea>

          {/* <input type="hidden" name="type" value={activeTab} /> */}

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
              disabled={loading}
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
              disabled={loading}
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
