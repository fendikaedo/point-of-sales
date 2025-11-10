export default function Header() {
  return (
    <header className="w-full bg-blue-600 text-white py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
        <div className="flex items-center gap-2">
          {/* <img src="/logo.png" alt="logo" className="w-8 h-8 rounded-full" /> */}
          <h1 className="text-xl font-semibold">Point Of Sales</h1>
        </div>
        <div className="font-medium text-end">
          <h1>Fendika Edo Ferdinata</h1>
          <h2 className="text-sm leading-2">3124510130</h2>
        </div>
      </div>
    </header>
  );
}
