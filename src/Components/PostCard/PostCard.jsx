import { Link } from "react-router-dom";
import CategoryBadge from "../CategoryBadge/CategoryBadge";

export default function PostCard({ post, layout = "grid" }) {
  const isList = layout === "list";

  return (
    <div className={`group glass-panel rounded-2xl overflow-hidden hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-all duration-500 flex ${isList ? 'flex-col md:flex-row h-auto md:h-64' : 'flex-col h-full'} animate-fade-in-up`}>
      <Link to={`/post/${post.slug || post.id}`} className={`relative overflow-hidden block ${isList ? 'w-full md:w-5/12 h-64 md:h-full' : 'h-60'}`}>
        {/* Hover overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300 z-10" />
        
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
        
        <div className="absolute top-4 right-4 z-20">
          <CategoryBadge category={post.category} color="primary" />
        </div>
      </Link>

      <div className={`p-6 flex flex-col flex-1 relative z-20 ${isList ? 'md:w-7/12 justify-center px-8' : ''}`}>
        <Link to={`/post/${post.slug || post.id}`} className="mt-2 block">
          <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">
            {post.title}
          </h2>
          <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>
        </Link>
        
        <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-white/10"
            />
            <div>
              <p className="text-white text-sm font-semibold">{post.author.name}</p>
              <p className="text-gray-500 text-xs">{post.date}</p>
            </div>
          </div>
          <div className="text-gray-500 text-xs flex items-center justify-center">
            {post.readTime}
          </div>
        </div>
      </div>
    </div>
  );
}
