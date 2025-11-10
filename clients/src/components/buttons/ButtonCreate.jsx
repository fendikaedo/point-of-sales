export default function ButtonCreate({ onOpenModal, children }) {
  return (
    <button
      onClick={onOpenModal}
      className="flex justify-center items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow-sm cursor-pointer capitalize"
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
        className="lucide lucide-diamond-plus-icon lucide-diamond-plus"
      >
        <path d="M12 8v8" />
        <path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z" />
        <path d="M8 12h8" />
      </svg>
      {children}
    </button>
  );
}
