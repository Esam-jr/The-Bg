import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import TextareaAutosize from "react-textarea-autosize";

const CreatePost = () => {
  const [form, setForm] = useState({
    img: "",
    title: "",
    description: "",
  });
  const [preview, setPreview] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.post("https://the-bg.onrender.com/api/posts", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-4">Create New Post</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="img"
          placeholder="Image URL"
          value={form.img}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <TextareaAutosize
          name="description"
          placeholder="Write description using Markdown..."
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded min-h-[120px]"
          required
        />

        <button
          type="button"
          onClick={() => setPreview(!preview)}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          {preview ? "Edit Markdown" : "Preview Markdown"}
        </button>

        {preview && (
          <div className="p-4 border rounded bg-gray-100">
            <ReactMarkdown>{form.description}</ReactMarkdown>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Publish Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
