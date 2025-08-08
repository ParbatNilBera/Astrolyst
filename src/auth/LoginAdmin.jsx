import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { UserContext } from "../Context/userContext";
import axiosInstance from "../utils/axiosInstance";
import { API_PATH } from "../utils/apiPath";
import toast from "react-hot-toast";

export default function LoginAdmin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[@#$!\-_%^&*(),.?":{}|<>]/.test(password);

    return {
      isValid: minLength && hasUpperCase && hasLowerCase && hasSpecialChar,
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasSpecialChar,
    };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async () => {
    const newErrors = {};

    // Validate email
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else {
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        const missingRequirements = [];
        if (!passwordValidation.minLength)
          missingRequirements.push("8 characters");
        if (!passwordValidation.hasUpperCase)
          missingRequirements.push("1 uppercase letter");
        if (!passwordValidation.hasLowerCase)
          missingRequirements.push("1 lowercase letter");
        if (!passwordValidation.hasSpecialChar)
          missingRequirements.push("1 special character");

        newErrors.password = `Password must contain: ${missingRequirements.join(
          ", "
        )}`;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const { data } = await axiosInstance.post(API_PATH.AUTH.LOGIN_ADMIN, {
        email: formData.email,
        password: formData.password,
      });

      const { token, ...userData } = data.data;

      if (token) {
        toast.success("Login Successfully!");
        localStorage.setItem("token", token);
        updateUser({ ...userData, token });

        navigate("/admin-dashboard");
      } else {
        toast.error("Login failed: No token received");
        alert("Login failed: No token received");
      }
    } catch (error) {
      toast.error("Login Failed");
      console.error(
        "Login error:",
        error?.response?.data?.message || error.message
      );
      setErrors({
        email: "Login failed. Please check your credentials.",
        password: "",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return (
      validateEmail(formData.email) &&
      validatePassword(formData.password).isValid &&
      formData.email &&
      formData.password
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-white to-yellow-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl p-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-gray-500 text-sm">
              Please sign in to your account
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-800 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-xl border text-sm shadow-sm focus:outline-none focus:ring-2 transition-all duration-300 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-yellow-500"
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-xl border text-sm shadow-sm focus:outline-none focus:ring-2 transition-all duration-300 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-yellow-500"
                }`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}

              {/* Password requirements hint */}
              {formData.password &&
                !validatePassword(formData.password).isValid && (
                  <div className="mt-2 text-xs text-gray-600">
                    <p className="mb-1">Password must contain:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li
                        className={
                          validatePassword(formData.password).minLength
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        At least 8 characters
                      </li>
                      <li
                        className={
                          validatePassword(formData.password).hasUpperCase
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        1 uppercase letter
                      </li>
                      <li
                        className={
                          validatePassword(formData.password).hasLowerCase
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        1 lowercase letter
                      </li>
                      <li
                        className={
                          validatePassword(formData.password).hasSpecialChar
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        1 special character
                      </li>
                    </ul>
                  </div>
                )}
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isFormValid() || isSubmitting}
              className={`w-full py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                isFormValid() && !isSubmitting
                  ? "bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isSubmitting ? "Signing in..." : "Login"}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don’t have an account?{" "}
              <button
                onClick={() => {
                  navigate("/register");
                }}
                className="text-yellow-600 hover:underline font-medium transition-all duration-200"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
