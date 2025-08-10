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

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log("Logged in:", result.user);
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((err) => {
        const errorCode = err.code;
        setError(errorCode);
        //setError(err.message);
      });
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log("Google login success:", result.user);
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((err) => {
        setError(err.message);
      });
  };
  return (
    <>
      <div className="w-full max-w-md mx-auto my-12 p-6 sm:p-8 bg-white shadow rounded border">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Login to Your Account
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="input input-bordered w-full text-sm sm:text-base"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="input input-bordered w-full pr-10 text-sm sm:text-base"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px] text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Login Button */}
          <button
            type="submit"
            className="btn btn-primary w-full text-sm sm:text-base"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <div className="text-center mt-4 text-sm sm:text-base">
          <p>
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>

          <div className="divider text-gray-400">OR</div>

          {/* Google Button */}
          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <FaGoogle size={16} /> Continue with Google
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
