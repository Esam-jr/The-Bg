import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-gray-300 shadow-lg border-b border-gray-700">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link
            to="/"
            className="text-2xl font-bold text-white hover:text-gray-400 transition italic"
          >
            Dev-Talk
          </Link>

          <div className="space-x-6">
            <a
              href="https://esmael-sabir.vercel.app/"
              className="hover:text-white transition italic"
            >
              About
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
