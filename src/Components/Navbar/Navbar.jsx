import { NavLink } from "react-router-dom";

export default function Navbar() {
  const navLinks = [
    { name: "الرئيسية", path: "/" },
    { name: "المدونة", path: "/blog" },
    { name: "من نحن", path: "/about" },
  ];

  return (
    <nav className="bg-[#161616] text-white">
      <div className="container mx-auto flex items-center justify-between py-4">
        <div>
          <h1 className="text-2xl font-bold">عدسة</h1>
          <p className="text-gray-400 text-sm">عالم التصوير</p>
        </div>

        <ul className="flex gap-6">
          {navLinks.map((nav) => (
            <li key={nav.name}>
              <NavLink
                to={nav.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-500 font-semibold"
                    : "hover:text-orange-500 transition"
                }
              >
                {nav.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition">
          ابدا القراءة
        </button>
      </div>
    </nav>
  );
}