import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="border border-gray-200 h-auto rounded-lg p-3 shadow-sm hover:shadow-md transition">
      <div className="flex flex-col h-full">
        <span className=" rounded border border-neutral-200 shadow-sm overflow-hidden h-32 md:h-52">
          <img
            src={product.photo_url}
            alt=""
            className="w-full h-full object-cover"
          />
        </span>
        <h4 className="text-sm md:text-base font-semibold">{product.name}</h4>
        <p className="mt-2 text-sm font-medium text-green-600 mb-2">
          Rp {product.price.toLocaleString()}
        </p>
        <div className="grow flex justify-end items-end">
          <button
            onClick={() => addToCart(product)}
            className="w-full bg-none border border-blue-600 text-blue-600 hover:bg-blue-600 hover:border-0 hover:text-white text-sm px-2 py-1.5 md:py-2 rounded-md cursor-pointer flex justify-center items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-shopping-cart-icon lucide-shopping-cart"
            >
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
            <h4>Keranjang</h4>
          </button>
        </div>
      </div>
    </div>
  );
}
