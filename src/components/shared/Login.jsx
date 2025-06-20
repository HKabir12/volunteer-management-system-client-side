import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { FaGoogle } from "react-icons/fa";
import app from "../../firebase/firebase.config";
import Navbar from "./Navbar";
import Footer from "./Footer";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setError(""); // Clear previous error

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      // Get JWT
      await fetch("https://volunteer-management-chi.vercel.app/jwt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: user.email }),
      });

      navigate(from, { replace: true });
    } catch (err) {
      console.error(err.message);
      setError("Email or password incorrect");
    }
  };

  const handleGoogleLogin = async () => {
    setError(""); // Clear previous error

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await fetch("https://volunteer-management-chi.vercel.app/jwt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: user.email }),
      });

      navigate(from, { replace: true });
    } catch (err) {
      console.error(err.message);
      setError("Google login failed. Check domain in Firebase.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto my-12 p-6 bg-white shadow rounded border">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Login to Your Account</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="relative">
            <label className="label">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="input input-bordered w-full pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <p>
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
          </p>

          <div className="divider">OR</div>

          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full flex items-center justify-center gap-2"
          >
            <FaGoogle /> Continue with Google
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
