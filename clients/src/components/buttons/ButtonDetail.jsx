export default function ButtonDetail({ onOpenModal }) {
  return (
    <button
      onClick={onOpenModal}
      className="w-full flex justify-center items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow-sm cursor-pointer capitalize"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-book-check-icon lucide-book-check"
      >
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
        <path d="m9 9.5 2 2 4-4" />
      </svg>
    </button>
  );
}
