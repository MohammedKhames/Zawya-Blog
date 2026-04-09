import { useState } from "react";
import apiRespons from "../../response"
import Categories from "../Blog/Categories/Categories";
import PostsGrid from "../Blog/PostGrid/PostGrid";
import SearchBar from "../Blog/SearchBar/SearchBar"
import Pagination from "../Blog/Pagination/Pagination";


export default function Blog() {
  const posts = apiRespons.posts;
  const categories = apiRespons.categories;

  const [category, setCategory] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const postsPerPage = 6;

  // 1️⃣ filter by category
  let filtered = category
    ? posts.filter((p) => p.category === category)
    : posts;

  // 2️⃣ filter by search
  filtered = filtered.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  // 3️⃣ pagination logic
  const totalPages = Math.ceil(filtered.length / postsPerPage);
  const start = (page - 1) * postsPerPage;
  const paginatedPosts = filtered.slice(start, start + postsPerPage);

  return (
    <div className="container mx-auto py-10 text-white">
      <h3 className="text-3xl font-bold mb-8">Blog</h3>

      <Categories
        categories={categories}
        selected={category}
        setSelected={(cat) => {
          setCategory(cat);
          setPage(1); // reset page عند تغيير الكاتيجوري
        }}
      />

      <SearchBar search={search} setSearch={(val) => {
        setSearch(val);
        setPage(1); // reset page عند البحث
      }} />

      <PostsGrid posts={paginatedPosts} />

      <Pagination
        totalPages={totalPages}
        currentPage={page}
        setPage={setPage}
      />
    </div>
  );
}