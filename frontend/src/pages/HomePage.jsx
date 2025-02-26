import { useEffect, useState } from "react";
import axios from "axios";

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("https://the-bg.onrender.com/api/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center text-gray-300">
        Blog Posts
      </h1>

      {/* 2-column layout */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="p-4 border border-gray-700 rounded-lg shadow-lg bg-gray-800"
          >
            {/* Grayscale Image with Hover Effect */}
            <img
              src={post.img}
              alt={post.title}
              className="w-full h-48 object-cover rounded-lg filter grayscale hover:grayscale-0 transition duration-300"
            />
            <h2 className="text-xl font-semibold mt-2 text-gray-200">
              {post.title}
            </h2>
            <p className="text-gray-400">
              {post.description.substring(0, 100)}...
            </p>
            <a
              href={`/post/${post._id}`}
              className="text-gray-300 hover:text-white transition italic"
            >
              Read more
            </a>
            <p className="text-gray-500 text-sm mt-2">
              Created At: {new Date(post.CreatedAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
