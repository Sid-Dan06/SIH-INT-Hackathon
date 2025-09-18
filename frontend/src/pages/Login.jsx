import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role); // 👈 save role
        alert("✅ Login successful!");

        if (data.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/client-dashboard");
        }
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-2">Welcome Back!</h2>
        <p className="text-gray-600 text-center mb-6">
          Log in to continue protecting forests
        </p>

        {/* Social Login Buttons */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() =>
              (window.location.href = "http://localhost:5000/api/oauth/google")
            }
            className="flex-1 border rounded-md py-2 px-4 flex items-center justify-center hover:bg-gray-50"
          >
            <img src="/google-logo.png" alt="Google" className="w-5 h-5 mr-2" />
            Sign in with Google
          </button>
          <button
            onClick={() =>
              (window.location.href = "http://localhost:5000/api/oauth/github")
            }
            className="flex-1 border rounded-md py-2 px-4 flex items-center justify-center hover:bg-gray-50"
          >
            <img src="/github-logo.png" alt="GitHub" className="w-5 h-5 mr-2" />
            Sign in with GitHub
          </button>
        </div>

        <div className="flex items-center mb-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500 text-sm">OR CONTINUE WITH</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Email Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-sm text-gray-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Remember Me
            </label>
            <Link to="/forgot-password" className="text-green-600 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-green-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
