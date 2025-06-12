import React from "react";
import { Link } from "react-router";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-10 max-w-6xl mx-auto">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:place-items-center md:grid-cols-3 gap-8 text-center md:text-left">
        <div>
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/*" className="hover:underline text-gray-300">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/*" className="hover:underline text-gray-300">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/*" className="hover:underline text-gray-300">
                Developer Resources
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-300"
            >
              <FaLinkedinIn size={20} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              <FaGithub size={20} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">About</h3>
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Volunteer tasks Market. All rights reserved.
            <br />
            Built with using React & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
