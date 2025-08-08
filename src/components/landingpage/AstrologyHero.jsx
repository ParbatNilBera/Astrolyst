import { useState, useEffect } from "react";
import { Star, Moon, Sparkles } from "lucide-react";

export default function AstrologyHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-25 overflow-hidden">
      {/* Celestial Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Stars */}
        <div className="absolute top-20 left-10 text-yellow-400 opacity-60 animate-pulse">
          <Star size={16} fill="currentColor" />
        </div>
        <div
          className="absolute top-32 right-20 text-yellow-300 opacity-40 animate-bounce"
          style={{ animationDelay: "1s" }}
        >
          <Sparkles size={20} />
        </div>
        <div
          className="absolute top-60 left-1/4 text-yellow-400 opacity-50 animate-pulse"
          style={{ animationDelay: "2s" }}
        >
          <Star size={12} fill="currentColor" />
        </div>
        <div
          className="absolute bottom-40 right-10 text-yellow-300 opacity-60 animate-pulse"
          style={{ animationDelay: "0.5s" }}
        >
          <Moon size={18} />
        </div>
        <div
          className="absolute bottom-20 left-16 text-yellow-400 opacity-40 animate-bounce"
          style={{ animationDelay: "1.5s" }}
        >
          <Sparkles size={14} />
        </div>

        {/* Subtle Gradient Orbs */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-yellow-200 to-transparent opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-gradient-to-tl from-yellow-300 to-transparent opacity-15 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div
            className={`space-y-8 transform transition-all duration-1000 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Connect with
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400">
                  India's Top
                </span>
                <span className="block">Astrologers</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg">
                Get accurate predictions, free kundli, and expert consultations
                from certified astrologers who understand your cosmic journey.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-1">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-yellow-500 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-yellow-600 rounded-full border-2 border-white"></div>
                </div>
                <span className="font-medium">10,000+ satisfied clients</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star
                  size={16}
                  className="text-yellow-400"
                  fill="currentColor"
                />
                <span className="font-medium">4.9/5 rating</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group relative bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl overflow-hidden">
                <span className="relative z-10">Talk to Astrologer</span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-yellow-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </button>

              <button className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Free Kundli
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">Expert Astrologers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-600">Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">100%</div>
                <div className="text-sm text-gray-600">Confidential</div>
              </div>
            </div>
          </div>

          {/* Right Side - Astrologer Image */}
          <div
            className={`relative transform transition-all duration-1000 delay-300 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
          >
            {/* Decorative Frame */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-3xl opacity-20 blur-lg"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
                {/* Astrologer Illustration */}
                <div className="aspect-[4/5] bg-gradient-to-b from-yellow-50 to-white p-8 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    {/* Placeholder for astrologer - using CSS art */}
                    <div className="relative w-48 h-48 mx-auto">
                      {/* Face */}
                      <div className="w-32 h-32 bg-yellow-100 rounded-full mx-auto relative border-4 border-yellow-200">
                        {/* Eyes */}
                        <div className="absolute top-8 left-6 w-3 h-3 bg-gray-800 rounded-full"></div>
                        <div className="absolute top-8 right-6 w-3 h-3 bg-gray-800 rounded-full"></div>
                        {/* Nose */}
                        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-yellow-300 rounded-full"></div>
                        {/* Smile */}
                        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-6 h-3 border-b-2 border-gray-800 rounded-full"></div>
                      </div>

                      {/* Turban/Head covering */}
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-36 h-20 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded-t-full"></div>

                      {/* Body */}
                      <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-24 h-20 bg-gradient-to-b from-yellow-200 to-yellow-300 rounded-t-full"></div>
                    </div>

                    {/* Mystical Elements */}
                    <div className="space-y-2">
                      <div className="flex justify-center space-x-2">
                        <Star
                          size={12}
                          className="text-yellow-500"
                          fill="currentColor"
                        />
                        <Star
                          size={16}
                          className="text-yellow-400"
                          fill="currentColor"
                        />
                        <Star
                          size={12}
                          className="text-yellow-500"
                          fill="currentColor"
                        />
                      </div>
                      <p className="text-sm text-gray-600 font-medium">
                        Guruji Acharya Rajesh
                      </p>
                      <p className="text-xs text-gray-500">
                        25+ Years Experience
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div
                  className="absolute top-4 left-4 text-yellow-400 opacity-60 animate-spin"
                  style={{ animationDuration: "8s" }}
                >
                  <Sparkles size={16} />
                </div>
                <div className="absolute bottom-4 right-4 text-yellow-300 opacity-60 animate-pulse">
                  <Moon size={18} />
                </div>
              </div>
            </div>

            {/* Floating Testimonial */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 max-w-64 transform rotate-2 hover:rotate-0 transition-transform duration-300">
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      size={12}
                      className="text-yellow-400"
                      fill="currentColor"
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                "Amazing accuracy! The predictions came true exactly as
                predicted."
              </p>
              <p className="text-xs text-gray-500 mt-1 font-medium">
                - Priya S.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
