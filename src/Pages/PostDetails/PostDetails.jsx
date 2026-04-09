import { useParams } from "react-router-dom";
import apiRespons from "../../response";

export default function PostDetails() {
  const { id } = useParams();
  const post = apiRespons.posts.find((p) => p.id === Number(id));

  if (!post) return <h2 className="text-white text-center mt-20">المقال غير موجود</h2>;

  return (
    <div className="container mx-auto py-10 text-white">
      <img
        src={`https://picsum.photos/seed/${post.id}/900/400`}
        alt={post.title}
        className="w-full h-[400px] object-cover rounded-xl mb-8"
      />

      <h1 className="text-4xl font-bold text-orange-500 mb-6">
        {post.title}
      </h1>

      <p className="text-gray-300 leading-8 text-lg">
        {post.body}
      </p>
    </div>
  );
}