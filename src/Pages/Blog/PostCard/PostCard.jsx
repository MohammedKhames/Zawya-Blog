import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <Link to={`/post/${post.id}`}>
      <div className="bg-[#1e1e1e] p-6 rounded-xl hover:scale-105 transition cursor-pointer">
        <img
          src={`https://picsum.photos/seed/${post.id}/400/200`}
          alt={post.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <h4 className="text-xl font-semibold text-orange-500 mb-3">
          {post.title}
        </h4>
        <p className="text-gray-300 line-clamp-3">{post.body}</p>
      </div>
    </Link>
  );
}