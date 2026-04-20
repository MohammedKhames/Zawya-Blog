import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import apiResponse from "../../response";

export default function Navbar() {
  const { siteInfo } = apiResponse;
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/blog?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: "الرئيسية", path: "/" },
    { name: "المدونة", path: "/blog" },
    { name: "عن زاوية", path: "/about" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/5 transition-all duration-300">
      <div className="container mx-auto px-4 lg:px-8 py-3 md:py-4 flex items-center justify-between">
        
        <div className="flex items-center gap-2 md:gap-3">
          {/* Hamburger Menu Toggle (Mobile Only) */}
          <button 
            className="md:hidden text-gray-400 hover:text-white p-1" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>

          <div className="w-9 h-9 md:w-10 md:h-10 bg-primary/10 rounded-full flex items-center justify-center border border-primary/30 text-primary shrink-0">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 6h2.5l1.5-2h8l1.5 2H20a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zm8 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/>
            </svg>
          </div>
          <div className="text-right hidden xs:block">
            <h1 className="text-lg md:text-xl font-black text-white tracking-tight leading-none">{siteInfo.name}</h1>
            <p className="text-primary/80 text-[9px] md:text-[10px] font-semibold tracking-wider mt-1">{siteInfo.tagline}</p>
          </div>
        </div>

        {/* Center - Links (Desktop Only) */}
        <div className="hidden md:flex">
          <ul className="flex items-center bg-white/5 border border-white/10 rounded-full p-1">
            {navLinks.map((nav) => (
              <li key={nav.name}>
                <NavLink
                  to={nav.path}
                  className={({ isActive }) =>
                    `px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 inline-block ${
                      isActive
                        ? "bg-primary text-black shadow-[0_0_15px_rgba(255,165,0,0.3)]"
                        : "text-gray-400 hover:text-white"
                    }`
                  }
                >
                  {nav.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Left - Search & Button */}
        <div className="flex items-center gap-2 md:gap-4 flex-row-reverse">
          <button className="hidden sm:block bg-primary text-black px-4 md:px-6 py-2.5 rounded-full text-sm font-bold hover:bg-white transition-all duration-300 whitespace-nowrap">
            ابدأ القراءة
          </button>
          
          <div className="relative flex items-center">
            <form onSubmit={handleSearchSubmit} className="flex items-center">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث..." 
                className={`transition-all duration-300 bg-[#111] border border-white/20 text-white rounded-full px-4 h-10 outline-none focus:border-primary absolute md:static top-1/2 -translate-y-1/2 right-0 ${isSearchOpen ? 'w-[calc(100vw-80px)] sm:w-64 md:w-48 opacity-100 z-10 block' : 'w-0 opacity-0 px-0 border-transparent overflow-hidden'}`}
              />
              <button 
                type="button" 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5 z-20 relative"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </button>
            </form>
          </div>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden absolute w-full left-0 top-full bg-[#111] border-b border-white/10 shadow-2xl transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100 py-4' : 'max-h-0 opacity-0 py-0'}`}>
        <div className="container mx-auto px-4 flex flex-col gap-2">
          {navLinks.map((nav) => (
            <NavLink
              key={nav.name}
              to={nav.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `px-6 py-3 rounded-xl text-md font-bold transition-all duration-300 text-center ${
                  isActive
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`
              }
            >
              {nav.name}
            </NavLink>
          ))}
          <button className="bg-primary text-black px-6 py-3 rounded-xl text-md font-bold hover:bg-white transition-all duration-300 w-full mt-4">
            ابدأ القراءة
          </button>
        </div>
      </div>
    </nav>
  );
}