export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-6 border-t border-gray-700">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-lg font-semibold text-white">Dev-Talk</p>
        <p className="text-sm mt-1">
          © {new Date().getFullYear()} All rights reserved.
        </p>

        <div className="flex justify-center space-x-6 mt-3">
          <a
            href="https://x.com/Esmael_sabir"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            Twitter
          </a>
          <a
            href="https://github.com/Esam-jr"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/esmael-sabir/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
