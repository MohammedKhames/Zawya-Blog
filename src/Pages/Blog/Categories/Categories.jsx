
export default function Categories({ categories, selected, setSelected }) {
  return (
    <ul className="flex gap-6 mb-10 flex-wrap">
      <li
        onClick={() => setSelected(null)}
        className={`cursor-pointer ${
          selected === null
            ? "text-orange-500 font-semibold"
            : "hover:text-orange-500 transition"
        }`}
      >
        جميع المقالات
      </li>

      {categories.map((cat) => (
        <li
          key={cat.name}
          onClick={() => setSelected(cat.name)}
          className={`cursor-pointer ${
            selected === cat.name
              ? "text-orange-500 font-semibold"
              : "hover:text-orange-500 transition"
          }`}
        >
          {cat.name}
        </li>
      ))}
    </ul>
  );
}