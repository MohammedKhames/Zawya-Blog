import { useState } from "react";
import apiResponse from "../../response";
import PostCard from "../../Components/PostCard/PostCard";

export default function Blog() {
  const posts = apiResponse.posts;
  const categories = apiResponse.categories;

  const [category, setCategory] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid");

  const postsPerPage = viewMode === "grid" ? 6 : 5;

  //  filter by category
  let filtered = category
    ? posts.filter((p) => p.category === category)
    : posts;

  // filter by search
  filtered = filtered.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  // pagination logic
  const totalPages = Math.ceil(filtered.length / postsPerPage) || 1;
  const start = (page - 1) * postsPerPage;
  const paginatedPosts = filtered.slice(start, start + postsPerPage);

  return (
    <div className="space-y-16 animate-fade-in relative z-10 mx-auto px-4 lg:px-8 max-w-[1400px]">
      {/* Blog Header */}
      <div className="text-center max-w-3xl mx-auto space-y-6 pt-10">
        <h1 className="text-4xl md:text-6xl font-black text-white">المدونة</h1>
        <p className="text-xl text-gray-400">استكشف أحدث المقالات والنصائح في عالم التصوير الفوتوغرافي</p>
      </div>

      {/* Filters & Search */}
      <div className="glass-panel p-4 md:p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6 shadow-[0_0_20px_rgba(255,255,255,0.02)]">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 justify-center md:justify-start flex-1">
          <button
            onClick={() => { setCategory(null); setPage(1); }}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${!category ? 'bg-primary text-black' : 'hover:bg-white/10 text-gray-400'}`}
          >
            الكل
          </button>
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => { setCategory(cat.name); setPage(1); }}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${category === cat.name ? 'bg-primary text-black' : 'hover:bg-white/10 text-gray-400'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          {/* Search Bar */}
          <div className="relative flex-1 md:w-64">
            <input
              type="text"
              placeholder="ابحث عن مقال..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full bg-darkBg border border-white/10 text-white px-4 py-3 rounded-full focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all duration-300 pr-10"
            />
            <svg className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-black/40 border border-white/10 rounded-[20px] p-1.5 shadow-inner">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2.5 rounded-[14px] transition-all duration-300 ${viewMode === 'grid' ? 'bg-primary text-black shadow-lg scale-105' : 'text-gray-500 hover:text-white'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2.5 rounded-[14px] transition-all duration-300 ${viewMode === 'list' ? 'bg-primary text-black shadow-lg scale-105' : 'text-gray-500 hover:text-white'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      {paginatedPosts.length > 0 ? (
        <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:px-12'}`}>
          {paginatedPosts.map((post, index) => (
            <div key={post.id} className="animate-fade-in-up" style={{ animationDelay: `${0.1 * index}s` }}>
              <PostCard post={post} layout={viewMode} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 glass-panel rounded-2xl">
          <h3 className="text-2xl font-bold text-gray-400">لا توجد مقالات تطابق بحثك.</h3>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 pt-8 border-t border-white/5">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-6 py-2 rounded-full glass-panel hover:bg-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            السابق
          </button>
          <span className="text-gray-400 font-bold">
            صفحة {page} من {totalPages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-6 py-2 rounded-full glass-panel hover:bg-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            التالي
          </button>
        </div>
      )}
    </div>
  );
}