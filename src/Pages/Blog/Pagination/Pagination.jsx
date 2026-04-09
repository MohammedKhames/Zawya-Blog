export default function Pagination({ totalPages, currentPage, setPage }) {
  if (totalPages === 1) return null;

  return (
    <div className="flex justify-center gap-3 mt-10">
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          onClick={() => setPage(i + 1)}
          className={`px-4 py-2 rounded-lg ${
            currentPage === i + 1
              ? "bg-orange-500"
              : "bg-[#1e1e1e] hover:bg-orange-500 transition"
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}