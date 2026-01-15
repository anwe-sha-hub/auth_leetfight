import React from "react";
import { useState } from "react";

export default function SignupForm() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const kiitEmailRegex = /^[a-zA-Z0-9._%+-]+@kiit\.ac\.in$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Clear error only for the field being edited
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setSuccess("");
  };

  const validate = () => {
    const newErrors = {};

    if (!form.username) {
      newErrors.username = "Email is required";
    } else if (!kiitEmailRegex.test(form.username)) {
      newErrors.username = "Use your KIIT email (@kiit.ac.in)";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Minimum 6 characters required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    // fake delay (simulate API)
    await new Promise((res) => setTimeout(res, 1000));

    setLoading(false);
    setSuccess("Signup successful. KIIT email verified.");
    setForm({ username: "", password: "" });
  };

  const inputClass = (error) =>
    `w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition
     ${error ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-black"}`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl"
      >
        <h2 className="text-2xl font-bold text-center mb-2">Create Account</h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Use your official KIIT email
        </p>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="yourroll@kiit.ac.in"
            className={inputClass(errors.username)}
          />
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">{errors.username}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              className={inputClass(errors.password)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-sm text-gray-500 hover:text-black"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white font-medium transition
            ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-800"}
          `}
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>

        {success && (
          <p className="text-green-600 text-sm text-center mt-4">{success}</p>
        )}
      </form>
    </div>
  );
}
