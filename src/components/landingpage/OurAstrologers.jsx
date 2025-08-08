import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

export default function OurAstrologers() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(4);

  const astrologers = [
    {
      id: 1,
      name: "Pandit Rajesh Sharma",
      specialization: "Vedic Astrology",
      experience: "15+ Years",
      rating: 4.9,
      consultations: "5,000+",
      languages: "Hindi, English",
      avatar: "RS",
    },
    {
      id: 2,
      name: "Dr. Priya Agarwal",
      specialization: "KP Astrology",
      experience: "12+ Years",
      rating: 4.8,
      consultations: "3,500+",
      languages: "Hindi, English, Marathi",
      avatar: "PA",
    },
    {
      id: 3,
      name: "Acharya Vikram Singh",
      specialization: "Numerology",
      experience: "20+ Years",
      rating: 4.9,
      consultations: "8,000+",
      languages: "Hindi, English, Punjabi",
      avatar: "VS",
    },
    {
      id: 4,
      name: "Guru Meera Joshi",
      specialization: "Tarot Reading",
      experience: "10+ Years",
      rating: 4.7,
      consultations: "4,200+",
      languages: "Hindi, English, Gujarati",
      avatar: "MJ",
    },
    {
      id: 5,
      name: "Pandit Suresh Kumar",
      specialization: "Palmistry",
      experience: "18+ Years",
      rating: 4.8,
      consultations: "6,500+",
      languages: "Hindi, English, Bengali",
      avatar: "SK",
    },
    {
      id: 6,
      name: "Dr. Anita Verma",
      specialization: "Face Reading",
      experience: "14+ Years",
      rating: 4.9,
      consultations: "4,800+",
      languages: "Hindi, English, Tamil",
      avatar: "AV",
    },
  ];

  // Update cards to show based on screen size
  useEffect(() => {
    const updateCardsToShow = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCardsToShow(1); // Mobile
      } else if (width < 768) {
        setCardsToShow(1); // Small mobile
      } else if (width < 1024) {
        setCardsToShow(2); // Tablet
      } else if (width < 1280) {
        setCardsToShow(3); // Small desktop
      } else {
        setCardsToShow(4); // Large desktop
      }
    };

    updateCardsToShow();
    window.addEventListener("resize", updateCardsToShow);
    return () => window.removeEventListener("resize", updateCardsToShow);
  }, []);

  // Reset current index when cardsToShow changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [cardsToShow]);

  const maxIndex = Math.max(0, astrologers.length - cardsToShow);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Get responsive width class
  const getCardWidthClass = () => {
    switch (cardsToShow) {
      case 1:
        return "w-full";
      case 2:
        return "w-1/2";
      case 3:
        return "w-1/3";
      case 4:
        return "w-1/4";
      default:
        return "w-1/4";
    }
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-yellow-50 via-white to-yellow-25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif tracking-tight">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-500">
              Astrologers
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 font-light px-4">
            13,000+ Trusted Astrologers Available for Consultation
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 mx-auto rounded-full mt-6"></div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows - Hidden on mobile */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white hover:bg-gray-50 rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hidden sm:block"
            disabled={currentIndex === 0}
          >
            <ChevronLeft
              size={20}
              className={`sm:w-6 sm:h-6 ${
                currentIndex === 0
                  ? "text-gray-300"
                  : "text-gray-700 hover:text-yellow-600"
              } transition-colors`}
            />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white hover:bg-gray-50 rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hidden sm:block"
            disabled={currentIndex >= maxIndex}
          >
            <ChevronRight
              size={20}
              className={`sm:w-6 sm:h-6 ${
                currentIndex >= maxIndex
                  ? "text-gray-300"
                  : "text-gray-700 hover:text-yellow-600"
              } transition-colors`}
            />
          </button>

          {/* Cards Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / cardsToShow)
                }%)`,
              }}
            >
              {astrologers.map((astrologer) => (
                <div
                  key={astrologer.id}
                  className={`${getCardWidthClass()} flex-shrink-0 px-2 sm:px-3`}
                >
                  <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-yellow-100 group h-full">
                    {/* Avatar */}
                    <div className="relative mb-4 sm:mb-6">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white font-bold text-base sm:text-lg">
                          {astrologer.avatar}
                        </span>
                      </div>

                      {/* Online Status */}
                      <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                      </div>
                    </div>

                    {/* Astrologer Info */}
                    <div className="text-center space-y-2 sm:space-y-3">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 font-serif group-hover:text-yellow-700 transition-colors duration-300 leading-tight">
                        {astrologer.name}
                      </h3>

                      <p className="text-yellow-600 font-medium text-sm">
                        {astrologer.specialization}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center justify-center space-x-1">
                        <Star
                          size={14}
                          className="sm:w-4 sm:h-4 text-yellow-400 fill-current"
                        />
                        <span className="text-sm font-medium text-gray-700">
                          {astrologer.rating}
                        </span>
                        <span className="text-xs sm:text-sm text-gray-500">
                          ({astrologer.consultations})
                        </span>
                      </div>

                      {/* Experience & Languages */}
                      <div className="space-y-1 text-xs text-gray-600">
                        <p>
                          <span className="font-medium">Exp:</span>{" "}
                          {astrologer.experience}
                        </p>
                        <p className="leading-relaxed">
                          <span className="font-medium">Languages:</span>{" "}
                          {astrologer.languages}
                        </p>
                      </div>

                      {/* CTA Buttons */}
                      <div className="space-y-2 pt-3 sm:pt-4">
                        <button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white py-2 px-3 sm:px-4 rounded-full font-medium text-sm shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                          Book Now
                        </button>
                        <button className="w-full border border-gray-300 hover:border-yellow-400 text-gray-700 hover:text-yellow-600 py-2 px-3 sm:px-4 rounded-full font-medium text-sm transition-all duration-300">
                          View Profile
                        </button>
                      </div>
                    </div>

                    {/* Card Bottom Accent */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Navigation Arrows */}
          <div className="flex justify-center space-x-4 mt-6 sm:hidden">
            <button
              onClick={prevSlide}
              className="bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              disabled={currentIndex === 0}
            >
              <ChevronLeft
                size={20}
                className={`${
                  currentIndex === 0
                    ? "text-gray-300"
                    : "text-gray-700 hover:text-yellow-600"
                } transition-colors`}
              />
            </button>

            <button
              onClick={nextSlide}
              className="bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              disabled={currentIndex >= maxIndex}
            >
              <ChevronRight
                size={20}
                className={`${
                  currentIndex >= maxIndex
                    ? "text-gray-300"
                    : "text-gray-700 hover:text-yellow-600"
                } transition-colors`}
              />
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center space-x-2 mt-6 sm:mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "bg-yellow-500 w-6 sm:w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 sm:mt-16 px-4">
          <p className="text-gray-600 mb-6 text-sm sm:text-base">
            Can't find the perfect astrologer? Let us help you choose.
          </p>
          <button className="bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-900 hover:border-yellow-500 px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm sm:text-base">
            Find My Astrologer
          </button>
        </div>
      </div>
    </section>
  );
}
