import React, { useState } from "react";
import {
  Star,
  Moon,
  Sun,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Send,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AstrologyFooter = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = () => {
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const generateStars = (count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 3,
    }));
  };

  const stars = generateStars(50);

  return (
    <footer className="top-0 z-50 bg-gradient-to-r from-yellow-50 to-white backdrop-blur-lg border-b border-gray-100 shadow-sm">
      {/* Decorative Stars Background */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute animate-pulse"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationDelay: `${star.delay}s`,
              animationDuration: "4s",
            }}
          >
            <div
              className="bg-yellow-800 rounded-full opacity-60"
              style={{
                width: `${star.size}px`,
                height: `${star.size}px`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Constellation Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <linearGradient
            id="constellation-footer"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#ffd700" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <path
          d="M50,50 L150,80 L250,60 L350,90"
          stroke="url(#constellation-footer)"
          strokeWidth="0.5"
          fill="none"
        />
        <path
          d="M100,150 L200,130 L300,160 L400,140"
          stroke="url(#constellation-footer)"
          strokeWidth="0.5"
          fill="none"
        />
        <path
          d="M0,200 L100,220 L200,200 L300,230"
          stroke="url(#constellation-footer)"
          strokeWidth="0.5"
          fill="none"
        />
      </svg>

      {/* Glowing Orbs */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-full opacity-20 blur-xl animate-pulse" />
      <div
        className="absolute bottom-20 left-10 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-25 blur-lg animate-pulse"
        style={{ animationDelay: "1.5s" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="relative">
                <Star
                  className="w-8 h-8 text-yellow-600 animate-spin"
                  style={{ animationDuration: "10s" }}
                />
                <div className="absolute -inset-1 bg-yellow-600 rounded-full opacity-20 blur-sm" />
              </div>
              <h3 className="ml-3 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-700 to-yellow-900 font-serif">
                Celestial Wisdom
              </h3>
            </div>
            <p className="text-yellow-600 text-sm leading-relaxed mb-4">
              Unlock the mysteries of the cosmos and discover your divine path
              through ancient astrological wisdom.
            </p>
            <div className="flex space-x-3">
              <Sun className="w-5 h-5 text-yellow-600 animate-pulse" />
              <Moon
                className="w-5 h-5 text-yellow-500 animate-bounce"
                style={{ animationDuration: "3s" }}
              />
              <Star className="w-5 h-5 text-yellow-600" />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold text-yellow-800 mb-4 flex items-center">
              <Star className="w-4 h-4 mr-2" />
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                "Home",
                "About Us",
                "Services",
                "Readings",
                "Blog",
                "Contact",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-yellow-700 hover:text-yellow-600 transition-colors duration-300 text-sm hover:translate-x-1 inline-block transform"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services & Apply */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold text-yellow-800 mb-4 flex items-center">
              <Moon className="w-4 h-4 mr-2" />
              Services
            </h4>
            <ul className="space-y-2 mb-6">
              {[
                "Birth Chart Reading",
                "Tarot Consultation",
                "Relationship Compatibility",
                "Career Guidance",
              ].map((service) => (
                <li key={service}>
                  <a
                    href="#"
                    className="text-yellow-700 hover:text-yellow-800 transition-colors duration-300 text-sm hover:translate-x-1 inline-block transform"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>

            {/* Apply for Astrologer Button */}
            <button
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-indigo-900 font-semibold py-3 px-4 rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-yellow-400/30 text-sm"
              onClick={() => navigate("/astrologer-apply")}
            >
              ✨ Apply for Astrologer
            </button>
          </div>

          {/* Newsletter & Contact */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold text-yellow-700 mb-4 flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              Stay Connected
            </h4>

            {/* Newsletter Subscription */}
            <div className="mb-6">
              <div className="relative mb-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-yellow-600/50 border border-yellow-600/30 rounded-lg py-2 px-3 text-white placeholder-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm"
                />
              </div>
              <button
                onClick={handleNewsletterSubmit}
                className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center text-sm"
              >
                {isSubscribed ? (
                  <>✓ Subscribed!</>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Subscribe
                  </>
                )}
              </button>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 text-sm text-yellow-600">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-yellow-400" />
                +1 (555) 123-4567
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-yellow-400" />
                info@celestialwisdom.com
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-yellow-400" />
                Mystic Valley, CA
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t text-yellow-600/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              {[
                { Icon: Facebook, color: "hover:text-blue-400" },
                { Icon: Twitter, color: "hover:text-cyan-400" },
                { Icon: Instagram, color: "hover:text-pink-400" },
                { Icon: Youtube, color: "hover:text-red-400" },
              ].map(({ Icon, color }, index) => (
                <a
                  key={index}
                  href="#"
                  className={`w-10 h-10 bg-indigo-800/50 rounded-full flex items-center justify-center text-purple-200 ${color} transition-all duration-300 hover:scale-110 hover:shadow-lg border border-purple-400/20 hover:border-current`}
                >
                  <Icon className="w-5 h-5" />
                  text-
                </a>
              ))}
            </div>

            {/* Copyright */}
            <div className="flex items-center text-yellow-600 text-sm">
              <Star className="w-4 h-4 mr-2 text-yellow-400" />
              © 2025 Celestial Wisdom. All rights reserved.
              <Star className="w-4 h-4 ml-2 text-yellow-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-30" />
    </footer>
  );
};

export default AstrologyFooter;
