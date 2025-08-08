import { useContext, useState } from "react";
import { Eye, EyeOff, User, Mail, Phone, Lock, UserPlus } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATH } from "../utils/apiPath";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function RegisterUser() {
  const navigate = useNavigate("/");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const { updateUser } = useContext(UserContext);

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Validation functions
  const validateName = (name) => {
    return name.trim().length > 0;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[@#$!\-_%^&*(),.?":{}|<>]/.test(password);

    return {
      isValid: minLength && hasUpper && hasLower && hasNumber && hasSpecial,
      minLength,
      hasUpper,
      hasLower,
      hasNumber,
      hasSpecial,
    };
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (submitError) {
      setSubmitError("");
    }
  };

  // Validate all fields
  const validateForm = () => {
    const newErrors = {};

    if (!validateName(formData.name)) {
      newErrors.name = "Name is required";
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be exactly 10 digits";
    }

    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      const missing = [];
      if (!passwordValidation.minLength) missing.push("8 characters");
      if (!passwordValidation.hasUpper) missing.push("uppercase letter");
      if (!passwordValidation.hasLower) missing.push("lowercase letter");
      if (!passwordValidation.hasNumber) missing.push("number");
      if (!passwordValidation.hasSpecial) missing.push("special character");

      newErrors.password = `Password must contain: ${missing.join(", ")}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Check if form is valid for submit button
  const isFormValid = () => {
    return (
      validateName(formData.name) &&
      validateEmail(formData.email) &&
      validatePhoneNumber(formData.phoneNumber) &&
      validatePassword(formData.password).isValid
    );
  };

  // Handle form submission
  const handleRegister = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setSubmitError("");

    try {
      const response = await axiosInstance.post(API_PATH.AUTH.REGISTER, {
        email: formData.email,
        phone: formData.phoneNumber,
        name: formData.name,
        password: formData.password,
      });

      const { data } = response.data;

      if (data?.token) {
        // Save token
        localStorage.setItem("token", data.token);

        // Push user to context
        updateUser(data);
        navigate("/");
      }

      console.log("Registration successful:", data);
      toast.success("Registration Successfully!", {
        duration: 3000,
        icon: "✅",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      alert("Registration successful!");
    } catch (error) {
      console.error("Registration error:", error);
      setSubmitError(
        error?.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const passwordValidation = validatePassword(formData.password);

  return (
    <div className="min-h-screen top-0 z-50 bg-gradient-to-r from-yellow-50 to-white backdrop-blur-lg border-b">
      <div className="flex items-center justify-center min-h-screen px-4 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mb-4">
              <UserPlus className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
            <p className="text-gray-600 mt-2">Join us today and get started</p>
          </div>

          {/* Registration Form */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-yellow-100">
            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your email address"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Phone Number Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors ${
                      errors.phoneNumber ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter 10-digit phone number"
                    maxLength="10"
                  />
                </div>
                {errors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full pl-11 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Password Requirements */}
                {formData.password && (
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          passwordValidation.minLength
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      ></div>
                      <span
                        className={`text-xs ${
                          passwordValidation.minLength
                            ? "text-green-600"
                            : "text-gray-500"
                        }`}
                      >
                        At least 8 characters
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          passwordValidation.hasUpper
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      ></div>
                      <span
                        className={`text-xs ${
                          passwordValidation.hasUpper
                            ? "text-green-600"
                            : "text-gray-500"
                        }`}
                      >
                        Uppercase letter
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          passwordValidation.hasLower
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      ></div>
                      <span
                        className={`text-xs ${
                          passwordValidation.hasLower
                            ? "text-green-600"
                            : "text-gray-500"
                        }`}
                      >
                        Lowercase letter
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          passwordValidation.hasNumber
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      ></div>
                      <span
                        className={`text-xs ${
                          passwordValidation.hasNumber
                            ? "text-green-600"
                            : "text-gray-500"
                        }`}
                      >
                        Number
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          passwordValidation.hasSpecial
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      ></div>
                      <span
                        className={`text-xs ${
                          passwordValidation.hasSpecial
                            ? "text-green-600"
                            : "text-gray-500"
                        }`}
                      >
                        Special character
                      </span>
                    </div>
                  </div>
                )}

                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              {/* Submit Error */}
              {submitError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{submitError}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleRegister}
                disabled={!isFormValid() || isLoading}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  isFormValid() && !isLoading
                    ? "bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-yellow-600 hover:text-yellow-700 font-medium"
                >
                  Sign in here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
