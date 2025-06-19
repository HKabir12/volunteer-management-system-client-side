import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
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

    const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const loggedUser = result.user;

      // Get JWT 
      await fetch("http://localhost:5000/jwt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: loggedUser.email })
      });

      navigate(location.state || "/");
    } catch (err) {
      console.log(err)
      setError("Invalid credentials");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await fetch("http://localhost:5000/jwt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: user.email })
      });

      navigate(location.state || "/");
    } catch (err) {
      console.log(err)
      setError("Google login failed");
    }
  };
  return (
    <>
      <Navbar></Navbar>
      <div className="max-w-md mx-auto my-12 p-6 bg-white shadow rounded border">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Login Your Account
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            required
          />
          <div className="relative w-full">
            <label className="label">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full p-2 border rounded pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            <div>
              <p className="link link-hover">Forgot password?</p>
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm">
              {error} and your password incorrect
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded items-center hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>

          <button
            onClick={handleGoogleLogin}
            className="mt-4 w-full flex items-center justify-center gap-2 border py-2 rounded hover:bg-gray-100"
          >
            <FaGoogle /> Continue with Google
          </button>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Login;
