import supabase from '../config/supabaseClient.js';

export const getTransactions = async (request, h) => {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .order("date");
  if (error) return h.response({ error: error.message }).code(500);
  return h.response(data).code(200);
};

export const createTransaction = async (request, h) => {
  const { items, total_amount, customer_name } = request.payload;

  // 1. Buat transaksi utama
  const { data: transaction, error: transactionError } = await supabase
    .from('transactions')
    .insert([
      { total_amount, customer_name, date: new Date() }
    ])
    .select()
    .single();

  if (transactionError) {
    console.error(transactionError);
    return h.response({ error: 'Gagal membuat transaksi' }).code(500);
  }

  // 2. Simpan item transaksi
  const itemsData = items.map((item) => ({
    transaction_id: transaction.id,
    product_id: item.product_id,
    quantity: item.quantity,
    price: item.price,
    subtotal: item.quantity * item.price,
  }));

  const { error: itemsError } = await supabase
    .from('transaction_items')
    .insert(itemsData);

  if (itemsError) {
    console.error(itemsError);
    return h.response({ error: 'Gagal menyimpan item transaksi' }).code(500);
  }

  return h.response({ message: 'Transaksi berhasil', transaction }).code(201);
};
