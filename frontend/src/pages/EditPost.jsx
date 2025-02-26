import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import TextareaAutosize from "react-textarea-autosize";
import remarkGfm from "remark-gfm"; // Enables GitHub-Flavored Markdown (tables, lists, etc.)

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    img: "",
    title: "",
    description: "",
  });
  const [preview, setPreview] = useState(false);

  // Fetch existing post data
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/posts/${id}`)
      .then((res) => setForm(res.data))
      .catch((err) => console.error("Error fetching post:", err));
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit updated post
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.put(`https://the-bg.onrender.com/api/posts/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/");
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-4">Edit Post</h1>

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
          placeholder="Edit description using Markdown..."
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
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {form.description}
            </ReactMarkdown>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Update Post
        </button>
      </form>
    </div>
  );
}
