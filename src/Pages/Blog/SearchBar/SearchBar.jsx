export default function SearchBar({ search, setSearch }) {
  return (
    <div className="mb-8">
      <input
        type="text"
        placeholder="ابحث عن مقال..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-1/2 bg-[#1e1e1e] p-3 rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
      />
    </div>
  );
}