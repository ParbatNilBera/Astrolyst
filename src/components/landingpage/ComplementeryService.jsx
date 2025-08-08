import { Sun, ScrollText, Heart, Users } from "lucide-react";

export default function ComplimentaryServices() {
  const services = [
    {
      icon: Sun,
      title: "Today's Horoscope",
      description:
        "Get personalized daily predictions based on your zodiac sign and planetary positions for guidance throughout your day.",
    },
    {
      icon: ScrollText,
      title: "Free Kundli",
      description:
        "Generate your comprehensive birth chart with detailed planetary positions, doshas, and astrological insights completely free.",
    },
    {
      icon: Heart,
      title: "Compatibility",
      description:
        "Discover love compatibility with your partner through detailed astrological analysis of your zodiac signs and traits.",
    },
    {
      icon: Users,
      title: "Kundli Matching",
      description:
        "Traditional Vedic matchmaking service to analyze compatibility for marriage based on detailed birth chart comparison.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-yellow-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            <span className="font-serif">Complimentary</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-500 font-serif">
              Astrology Services
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 mx-auto rounded-full mt-6"></div>
          <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto leading-relaxed">
            Explore the cosmic wisdom with our free astrology services designed
            to guide you on your spiritual journey
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-yellow-100 overflow-hidden"
              >
                {/* Background Accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-yellow-500"></div>

                {/* Subtle Background Pattern */}
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-yellow-100 to-transparent rounded-full opacity-50"></div>

                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <IconComponent
                      size={28}
                      className="text-white"
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Decorative Ring */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 border-2 border-yellow-200 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500"></div>
                </div>

                {/* Content */}
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 font-serif group-hover:text-yellow-700 transition-colors duration-300">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed text-sm">
                    {service.description}
                  </p>

                  {/* Hover CTA */}
                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 pt-2">
                    <button className="text-yellow-600 font-medium text-sm hover:text-yellow-700 transition-colors duration-200 border-b border-yellow-300 hover:border-yellow-500 pb-1">
                      Explore Now →
                    </button>
                  </div>
                </div>

                {/* Card Bottom Accent */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-transparent via-yellow-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">
            Ready to dive deeper into your cosmic journey?
          </p>
          <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            View All Services
          </button>
        </div>
      </div>
    </section>
  );
}
