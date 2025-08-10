import { Link } from "react-router";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10  w-full">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center sm:text-left">
        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-primary">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/terms"
                className="hover:underline text-gray-300 transition-colors"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                to="/privacy"
                className="hover:underline text-gray-300 transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/developer"
                className="hover:underline text-gray-300 transition-colors"
              >
                Developer Resources
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-primary">Follow Us</h3>
          <div className="flex justify-center sm:justify-start space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors"
              aria-label="Facebook"
            >
              <FaFacebookF size={18} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400 transition-colors"
              aria-label="Twitter"
            >
              <FaTwitter size={18} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-300 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn size={18} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition-colors"
              aria-label="GitHub"
            >
              <FaGithub size={18} />
            </a>
          </div>
        </div>

        {/* About Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-primary">About</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-white font-bold">Volunteer Market</span>.{" "}
            <br />
            Empowering communities through volunteering. <br />
            Built with ❤️ using React & Tailwind CSS.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 mt-8 pt-4 text-center text-xs text-gray-500">
        All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
