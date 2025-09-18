import { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      setMessage(res.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <div className="text-green-600 text-5xl mb-4">🔑</div>
        <h1 className="text-2xl font-bold mb-2">Forgot your password?</h1>
        <p className="text-gray-600 mb-6">
          No worries, we'll send you reset instructions.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-left">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
          >
            Submit
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm text-gray-600">
            {message}
          </p>
        )}

        <p className="mt-6 text-sm">
          Remember your password?{" "}
          <a href="/login" className="text-green-600 font-medium">
            Log in here
          </a>
        </p>
      </div>
    </div>
  );
}
