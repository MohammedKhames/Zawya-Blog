import { Link } from "react-router-dom";

export default function CategoryBadge({ category, color = "primary" }) {
  // Mapping color to Tailwind classes
  const colorMap = {
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    orange: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    primary: "bg-primary/10 text-primary border-primary/20",
  };

  const selectedClass = colorMap[color] || colorMap.primary;

  return (
    <Link
      to={`/blog?category=${category}`}
      className={`px-3 py-1 text-xs font-bold rounded-full border backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${selectedClass}`}
    >
      {category}
    </Link>
  );
}
