import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATH } from "../../utils/apiPath";

const ApplyForAstrology = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    location: "",
    expertise: "",
    experience: "",
    languages: "",
    chatPerMin: 0,
    callPerMin: 0,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Special handling for phone number - only allow digits
    if (name === "phone") {
      const numericValue = value.replace(/\D/g, "");
      if (numericValue.length <= 10) {
        setFormData((prev) => ({ ...prev, [name]: numericValue }));
      }
      return;
    }

    // Special handling for email - convert to lowercase
    if (name === "email") {
      setFormData((prev) => ({ ...prev, [name]: value.toLowerCase() }));
      return;
    }

    // Special handling for numeric fields
    if (
      name === "experience" ||
      name === "chatPerMin" ||
      name === "callPerMin"
    ) {
      const numericValue = value === "" ? "" : Number(value);
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required field validations
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (formData.phone.length !== 10) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    if (!formData.expertise.trim()) {
      newErrors.expertise = "Expertise is required";
    }

    if (!formData.experience || formData.experience <= 0) {
      newErrors.experience =
        "Experience is required and must be greater than 0";
    }

    if (!formData.languages.trim()) {
      newErrors.languages = "Languages are required";
    }

    return newErrors;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      const validationErrors = validateForm();

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setIsSubmitting(false);
        return;
      }

      // Clean and prepare form data
      const {
        name,
        email,
        phone,
        gender,
        location,
        expertise,
        experience,
        languages,
        chatPerMin,
        callPerMin,
      } = formData;

      const requestData = {
        name,
        email,
        phone,
        gender,
        location,
        expertise: expertise
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        experience,
        languages: languages
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        chatPerMin: Number(chatPerMin) || 0,
        callPerMin: Number(callPerMin) || 0,
      };

      const response = await axiosInstance.post(
        API_PATH.AUTH.ASTROLOGER_APPLY,
        requestData
      );

      if (response.status === 200 || response.status === 201) {
        setSubmitSuccess(true);
        setErrors({});

        // Optionally reset the form
        setTimeout(() => {
          setFormData({
            name: "",
            email: "",
            phone: "",
            gender: "",
            location: "",
            expertise: "",
            experience: "",
            languages: "",
            chatPerMin: 0,
            callPerMin: 0,
          });
          setSubmitSuccess(false);
        }, 3000);
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setErrors({
        submit:
          error?.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            🧙 Apply to Become an Astrologer on Astrolyst
          </h1>
          <p className="text-gray-600 text-lg">
            Join our community of expert astrologers and help people discover
            their cosmic journey. Share your wisdom and connect with seekers
            worldwide.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {submitSuccess && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              🎉 Application submitted successfully! We'll review your
              application and get back to you soon.
            </div>
          )}

          {errors.submit && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {errors.submit}
            </div>
          )}

          <div className="space-y-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-colors ${
                  errors.name ? "border-red-400" : "border-gray-300"
                }`}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-colors ${
                  errors.email ? "border-red-400" : "border-gray-300"
                }`}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-colors ${
                  errors.phone ? "border-red-400" : "border-gray-300"
                }`}
                placeholder="1234567890"
                maxLength="10"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-colors"
              >
                <option value="">Select gender (optional)</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-colors"
                placeholder="City, State/Country (optional)"
              />
            </div>

            {/* Expertise */}
            <div>
              <label
                htmlFor="expertise"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Expertise *
              </label>
              <input
                type="text"
                id="expertise"
                name="expertise"
                value={formData.expertise}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-colors ${
                  errors.expertise ? "border-red-400" : "border-gray-300"
                }`}
                placeholder="Vedic Astrology, Numerology, Tarot Reading (comma-separated)"
              />
              <p className="text-gray-500 text-sm mt-1">
                List your areas of expertise separated by commas
              </p>
              {errors.expertise && (
                <p className="text-red-500 text-sm mt-1">{errors.expertise}</p>
              )}
            </div>

            {/* Experience */}
            <div>
              <label
                htmlFor="experience"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Years of Experience *
              </label>
              <input
                type="number"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                min="0"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-colors ${
                  errors.experience ? "border-red-400" : "border-gray-300"
                }`}
                placeholder="5"
              />
              {errors.experience && (
                <p className="text-red-500 text-sm mt-1">{errors.experience}</p>
              )}
            </div>

            {/* Languages */}
            <div>
              <label
                htmlFor="languages"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Languages *
              </label>
              <input
                type="text"
                id="languages"
                name="languages"
                value={formData.languages}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-colors ${
                  errors.languages ? "border-red-400" : "border-gray-300"
                }`}
                placeholder="Hindi, English, Sanskrit (comma-separated)"
              />
              <p className="text-gray-500 text-sm mt-1">
                List languages you can consult in, separated by commas
              </p>
              {errors.languages && (
                <p className="text-red-500 text-sm mt-1">{errors.languages}</p>
              )}
            </div>

            {/* Rate Fields */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="chatPerMin"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Chat Rate (₹ per minute)
                </label>
                <input
                  type="number"
                  id="chatPerMin"
                  name="chatPerMin"
                  value={formData.chatPerMin}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-colors"
                  placeholder="0"
                />
              </div>

              <div>
                <label
                  htmlFor="callPerMin"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Call Rate (₹ per minute)
                </label>
                <input
                  type="number"
                  id="callPerMin"
                  name="callPerMin"
                  value={formData.callPerMin}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-colors"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full py-4 px-6 text-lg font-semibold rounded-lg transition-all duration-200 ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-yellow-400 hover:bg-yellow-500 hover:shadow-lg transform hover:-translate-y-0.5"
                } text-black`}
              >
                {isSubmitting
                  ? "⏳ Submitting Application..."
                  : "✨ Submit Application"}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600">
          <p className="text-sm">
            By applying, you agree to our terms and conditions. We'll review
            your application within 2-3 business days.You will be informed
            through mail
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApplyForAstrology;
