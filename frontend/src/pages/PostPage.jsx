import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!post) return <p className="text-white text-center">Loading...</p>;

  return (
    <div className="bg-gray-800">
      <div className="max-w-3xl mx-auto p-6  bg-gray-800 rounded-lg ">
        <img
          src={post.img}
          alt={post.title}
          className="w-full h-64 object-cover rounded-lg mb-6 border border-blue-500"
        />

        <h1 className="text-4xl font-bold text-white mb-4">{post.title}</h1>

        <hr className="border-t border-white mb-6" />

        <section className="prose prose-lg text-white prose-invert mb-6">
          <ReactMarkdown>{post.description}</ReactMarkdown>
        </section>

        <div className="text-sm text-gray-400 mb-1.5">
          <p>Published at: {new Date(post.CreatedAt).toLocaleDateString()}</p>
          <p className="font-bold text-white">Esmael Sabir</p>
        </div>
      </div>
    </div>
  );
}
