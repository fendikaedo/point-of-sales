import ButtonDetail from "./buttons/ButtonDetail";

export default function Tabs({ activeTab, setActiveTab,onOpenModalDetail }) {
  return (
    <div className="flex flex-col-reverse md:flex-row justify-between gap-3 bg-white py-3 shadow-sm px-4">
      <div className="flex justify-center md:justify-start items-center gap-3 w-full">
        {["makanan", "minuman"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 grow rounded-lg font-medium md:text-base text-sm transition cursor-pointer ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Daftar {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-6">
        <ButtonDetail onOpenModal={onOpenModalDetail}/>
      </div>
    </div>
  );
}
