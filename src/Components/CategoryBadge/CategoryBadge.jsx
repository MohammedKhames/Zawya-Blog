import { Link } from "react-router-dom";

export default function CategoryBadge({ category, color = "primary" }) {
  // Mapping color to Tailwind classes
  const colorMap = {
    emerald: "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20",
    purple: "bg-purple-500 text-white shadow-lg shadow-purple-500/20",
    blue: "bg-blue-500 text-white shadow-lg shadow-blue-500/20",
    orange: "bg-orange-500 text-white shadow-lg shadow-orange-500/20",
    primary: "bg-primary text-black shadow-lg shadow-primary/20",
  };

  const selectedClass = colorMap[color] || colorMap.primary;

  return (
    <Link
      to={`/blog?category=${category}`}
      className={`px-4 py-1.5 text-xs font-black rounded-full transition-all duration-300 hover:brightness-110 hover:-translate-y-0.5 whitespace-nowrap ${selectedClass}`}
    >
      {category}
    </Link>
  );
}
