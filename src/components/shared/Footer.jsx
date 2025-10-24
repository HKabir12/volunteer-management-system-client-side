import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";

const Footer = () => {
  const socialLinks = [
    { icon: <FaFacebookF size={16} />, url: "https://facebook.com", hover: "hover:bg-blue-600" },
    { icon: <FaTwitter size={16} />, url: "https://twitter.com", hover: "hover:bg-sky-500" },
    { icon: <FaLinkedinIn size={16} />, url: "https://linkedin.com", hover: "hover:bg-blue-400" },
    { icon: <FaGithub size={16} />, url: "https://github.com", hover: "hover:bg-gray-700" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-200 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center sm:text-left">
        
        {/* Quick Links */}
        <div className="flex flex-col items-center sm:items-start">
          <h3 className="text-lg font-semibold mb-4 text-yellow-400">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-yellow-300 transition-colors">Home</Link>
            </li>
            <li>
              <Link to="/all-posts" className="hover:text-yellow-300 transition-colors">All Volunteer Posts</Link>
            </li>
            <li>
              <Link to="/manage-posts" className="hover:text-yellow-300 transition-colors">Manage My Posts</Link>
            </li>
            <li>
              <Link to="/add-post" className="hover:text-yellow-300 transition-colors">Add New Post</Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-center sm:items-start">
          <h3 className="text-lg font-semibold mb-4 text-yellow-400">Follow Us</h3>
          <div className="flex justify-center sm:justify-start gap-3">
            {socialLinks.map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 ${social.hover} transition-colors`}
                aria-label="Social Link"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* About Section */}
        <div className="flex flex-col items-center sm:items-start">
          <h3 className="text-lg font-semibold mb-4 text-yellow-400">About</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-white font-bold">Volunteer Management System</span>.<br />
            Connecting volunteers with opportunities to make a difference.<br />
            Built with ❤️ using React & Tailwind CSS.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 mt-10 pt-4 text-center text-xs text-gray-500">
        All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
