import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { useContext } from "react";
import { UserContext } from "../Context/userContext";
import axiosInstance from "../utils/axiosInstance";
import { API_PATH } from "../utils/apiPath";
import toast from "react-hot-toast";

export default function LoginUser() {
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
      const { data } = await axiosInstance.post(API_PATH.AUTH.LOGIN, {
        email: formData.email,
        password: formData.password,
      });

      const { token, ...userData } = data.data;

      if (token) {
        toast.success("Login Successfully!");
        localStorage.setItem("token", token);
        updateUser({ ...userData, token });

        navigate("/");
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
    <div className="min-h-screen top-0 z-50 bg-gradient-to-r from-yellow-50 to-white backdrop-blur-lg border-b flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-black mb-2">Welcome Back</h1>
            <p className="text-gray-600">Please sign in to your account</p>
          </div>

          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors ${
                  errors.email ? "border-red-500" : "border-gray-300"
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
                className="block text-sm font-medium text-black mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors ${
                  errors.password ? "border-red-500" : "border-gray-300"
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
                    <p>Password must contain:</p>
                    <ul className="list-disc list-inside ml-2 space-y-1">
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
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                isFormValid() && !isSubmitting
                  ? "bg-black text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isSubmitting ? "Signing in..." : "Login"}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => {
                  navigate("/register");
                }}
                className="text-black hover:underline font-medium"
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
