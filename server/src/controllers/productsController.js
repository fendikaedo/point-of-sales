import supabase from "../config/supabaseClient.js";

export const getProducts = async (request, h) => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at");
  if (error) return h.response({ error: error.message }).code(500);
  return h.response(data).code(200);
};

export const createProduct = async (request, h) => {
  try {
    console.log("=== [DEBUG] Payload diterima ===");
    console.log(Object.keys(request.payload));

    const file = request.payload.file;
    console.log("File object type:", typeof file);
    console.log("File keys:", file ? Object.keys(file) : "tidak ada file");

    const { name, price, stock, description, type } = request.payload;
    console.log({ name, price, stock, description, type });

    let photo_url = null;

    // === [Langkah Upload ke Supabase Storage] ===
    if (file && file.hapi && file._data) {
      const fileBuffer = file._data;
      const fileName = `${Date.now()}-${file.hapi.filename}`;

      console.log("File akan diupload:", fileName);

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("products")
        .upload(`uploads/${fileName}`, fileBuffer, {
          contentType: file.hapi.headers["content-type"],
          upsert: false,
        });

      if (uploadError) {
        console.error("[UPLOAD ERROR]", uploadError);
        return h.response({ error: "Gagal upload gambar ke Supabase" }).code(500);
      }

      const { data: publicUrlData } = supabase.storage
        .from("products")
        .getPublicUrl(`uploads/${fileName}`);

      photo_url = publicUrlData.publicUrl;
      console.log("Public URL:", photo_url);
    } else {
      console.warn("[WARNING] Tidak ada file di payload");
    }

    // === [Langkah Insert ke Database Supabase] ===
    const { data, error } = await supabase
      .from("products")
      .insert([
        {
          name,
          price: Number(price),
          stock: Number(stock),
          description,
          type,
          photo_url,
        },
      ])
      .select();

    if (error) {
      console.error("[INSERT ERROR]", error);
      return h.response({ error: error.message }).code(500);
    }

    console.log("Produk berhasil ditambahkan:", data);

    return h
      .response({ message: "Produk berhasil ditambahkan", data })
      .code(201);
  } catch (err) {
    console.error("[SERVER ERROR]", err);
    return h.response({ error: "Terjadi kesalahan pada server" }).code(500);
  }
};


export const updateProduct = async (request, h) => {
  const { id } = request.params;
  const { name, price, stock, description, photo_url, type } = request.payload;

  const { data, error } = await supabase
    .from("products")
    .update({ name, price, stock, description, photo_url, type })
    .eq("id", id)
    .select();

  if (error) return h.response({ error: error.message }).code(500);
  return h.response({ message: "Produk berhasil diperbarui", data }).code(200);
};

export const deleteProduct = async (request, h) => {
  const { id } = request.params;

  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) return h.response({ error: error.message }).code(500);
  return h.response({ message: "Produk berhasil dihapus" }).code(200);
};
