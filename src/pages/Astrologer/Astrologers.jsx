import React, { useState, useEffect, useContext } from "react";
import {
  Search,
  Star,
  MapPin,
  Languages,
  Calendar,
  Clock,
  X,
  Phone,
  MessageCircle,
} from "lucide-react";
import { API_PATH } from "../../utils/apiPath";
import axiosInstance from "../../utils/axiosInstance";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";

const AstrologerBookingPage = () => {
  const navigate = useNavigate();
  const [astrologers, setAstrologers] = useState([]);
  const [filteredAstrologers, setFilteredAstrologers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAstrologer, setSelectedAstrologer] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingData, setBookingData] = useState({
    bookingType: "chat",
    date: "",
    startTime: "",
    endTime: "",
    durationMinutes: 30,
    totalPrice: 0,
  });
  const [bookingError, setBookingError] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const { user } = useContext(UserContext);
  console.log("user is as follows:", user);
  // Fetch astrologers data
  useEffect(() => {
    const fetchAstrologers = async () => {
      try {
        setLoading(true);
        // Replace with actual API call
        const response = await axiosInstance.get(API_PATH.USER.GET_ASTROLOGERS);
        const astrologersData = response?.data?.data;
        console.log("HI", astrologersData);

        // Using mock data for demonstration
        setTimeout(() => {
          setAstrologers(astrologersData);
          setFilteredAstrologers(astrologersData);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError("Failed to fetch astrologers", err);
        setLoading(false);
      }
    };

    fetchAstrologers();
  }, []);

  // Filter astrologers based on search term
  useEffect(() => {
    const filtered = astrologers.filter(
      (astrologer) =>
        astrologer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        astrologer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        astrologer.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAstrologers(filtered);
  }, [searchTerm, astrologers]);

  // Calculate total price based on duration and booking type
  useEffect(() => {
    if (selectedAstrologer && bookingData.durationMinutes) {
      const rate =
        bookingData.bookingType === "chat"
          ? selectedAstrologer.chatPricePerMinute
          : selectedAstrologer.callPricePerMinute;
      const total = bookingData.durationMinutes * rate;
      setBookingData((prev) => ({ ...prev, totalPrice: total }));
    }
  }, [
    bookingData.durationMinutes,
    bookingData.bookingType,
    selectedAstrologer,
  ]);

  // Check if astrologer is available on selected date
  const isAvailableOnDate = (date, availability) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const selectedDay = days[new Date(`${date}T00:00:00`).getDay()];
    return availability.some((slot) => slot.day === selectedDay);
  };

  // Handle booking form submission
  const handleBooking = async () => {
    if (!user || user.role !== "user") {
      navigate("/login");
      return;
    }
    setBookingError("");

    // Validate required fields
    if (!bookingData.date || !bookingData.startTime || !bookingData.endTime) {
      setBookingError("Please fill in all required fields.");
      return;
    }

    console.log(bookingData.date, selectedAstrologer.availability);
    // Validate astrologer availability
    if (!isAvailableOnDate(bookingData.date, selectedAstrologer.availability)) {
      setBookingError("Astrologer not available on selected day.");
      return;
    }

    try {
      const payload = {
        astrologerId: selectedAstrologer._id, // assuming selectedAstrologer is fetched from DB
        bookingType: bookingData.bookingType,
        date: bookingData.date,
        timeSlot: {
          startTime: bookingData.startTime,
          endTime: bookingData.endTime,
        },
        durationMinutes: bookingData.durationMinutes,
        totalPrice: bookingData.totalPrice,
      };

      const response = await axiosInstance.post(
        API_PATH.USER.BOOK_APPOINTMENT,
        payload
      );

      if (response.data.status === "success") {
        setBookingSuccess(true);

        setTimeout(() => {
          setShowBookingModal(false);
          setBookingSuccess(false);
          setSelectedAstrologer(null);
          setBookingData({
            bookingType: "chat",
            date: "",
            startTime: "",
            endTime: "",
            durationMinutes: 30,
            totalPrice: 0,
          });
        }, 2000);
      } else {
        setBookingError(response.data.message || "Booking failed.");
      }
    } catch (err) {
      console.error("Booking error:", err);
      setBookingError("Failed to book appointment. Please try again.");
    }
  };

  // Generate time slots
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 21; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        slots.push(timeString);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fffbea] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#ffc107] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#444444] text-lg">Loading astrologers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#fffbea] flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#ffc107] hover:bg-[#ffb300] text-[#0f0f1a] px-6 py-2 rounded-md transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffbea]">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#0f0f1a] mb-2">
            Book an Astrologer
          </h1>
          <p className="text-[#444444] text-lg">
            Connect with experienced astrologers for guidance
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#444444] h-5 w-5" />
            <input
              type="text"
              placeholder="Search by name, email, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#f9fafb] border border-[#e5e7eb] rounded-lg focus:outline-none focus:border-[#ffc107] focus:ring-2 focus:ring-[#ffc107] focus:ring-opacity-20 transition-colors"
            />
          </div>
        </div>

        {/* Astrologers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredAstrologers.map((astrologer) => (
            <div
              key={astrologer._id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-[#0f0f1a] mb-1">
                    {astrologer.name}
                  </h3>
                  <div className="flex items-center text-[#444444] text-sm mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {astrologer.location}
                  </div>
                </div>
                <div className="flex items-center bg-[#fffbea] px-2 py-1 rounded-full">
                  <Star className="h-4 w-4 text-[#ffc107] fill-current mr-1" />
                  <span className="text-sm font-medium text-[#0f0f1a]">
                    {astrologer.rating}
                  </span>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <h4 className="text-sm font-medium text-[#0f0f1a] mb-1">
                    Expertise:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {astrologer.expertise.slice(0, 2).map((skill, index) => (
                      <span
                        key={index}
                        className="bg-[#fffbea] text-[#444444] px-2 py-1 rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                    {astrologer.expertise.length > 2 && (
                      <span className="text-[#444444] text-xs px-2 py-1">
                        +{astrologer.expertise.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-[#0f0f1a] mb-1 flex items-center">
                    <Languages className="h-4 w-4 mr-1" />
                    Languages:
                  </h4>
                  <p className="text-[#444444] text-sm">
                    {astrologer.languages.join(", ")}
                  </p>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center">
                    <MessageCircle className="h-4 w-4 text-[#ffc107] mr-1" />
                    <span className="text-[#0f0f1a] font-medium">
                      ₹{astrologer.chatPricePerMinute}/min
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-[#ffc107] mr-1" />
                    <span className="text-[#0f0f1a] font-medium">
                      ₹{astrologer.callPricePerMinute}/min
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-[#0f0f1a] mb-1">
                  Available Days:
                </h4>
                <div className="flex flex-wrap gap-1">
                  {astrologer.availability.map((item, index) => (
                    <span
                      key={index}
                      className="bg-[#ffc107] text-[#0f0f1a] px-2 py-1 rounded text-xs font-medium capitalize"
                    >
                      {item.day.slice(0, 3)}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedAstrologer(astrologer);
                  setShowBookingModal(true);
                }}
                className="w-full bg-[#ffc107] hover:bg-[#ffb300] text-[#0f0f1a] font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Book Appointment
              </button>
            </div>
          ))}
        </div>

        {filteredAstrologers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#444444] text-lg">
              No astrologers found matching your search.
            </p>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedAstrologer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#0f0f1a]">
                  Book Appointment
                </h2>
                <button
                  onClick={() => {
                    setShowBookingModal(false);
                    setBookingError("");
                    setSelectedAstrologer(null);
                  }}
                  className="text-[#444444] hover:text-[#0f0f1a] transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="bg-[#fffbea] rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-[#0f0f1a] mb-1">
                  {selectedAstrologer.name}
                </h3>
                <p className="text-[#444444] text-sm">
                  {selectedAstrologer.location}
                </p>
                <div className="flex justify-between mt-2 text-sm">
                  <span className="text-[#0f0f1a]">
                    Chat: ₹{selectedAstrologer.chatPricePerMinute}/min
                  </span>
                  <span className="text-[#0f0f1a]">
                    Call: ₹{selectedAstrologer.callPricePerMinute}/min
                  </span>
                </div>
              </div>

              {bookingSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-green-600 mb-2">
                    Booking Successful!
                  </h3>
                  <p className="text-[#444444]">
                    Your appointment has been booked successfully.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookingError && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                      {bookingError}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-[#0f0f1a] mb-2">
                      Booking Type
                    </label>
                    <select
                      value={bookingData.bookingType}
                      onChange={(e) =>
                        setBookingData((prev) => ({
                          ...prev,
                          bookingType: e.target.value,
                        }))
                      }
                      className="w-full p-3 bg-[#f9fafb] border border-[#e5e7eb] rounded-lg focus:outline-none focus:border-[#ffc107] focus:ring-2 focus:ring-[#ffc107] focus:ring-opacity-20"
                      required
                    >
                      <option value="chat">Chat Session</option>
                      <option value="call">Phone Call</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#0f0f1a] mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={bookingData.date}
                      onChange={(e) =>
                        setBookingData((prev) => ({
                          ...prev,
                          date: e.target.value,
                        }))
                      }
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full p-3 bg-[#f9fafb] border border-[#e5e7eb] rounded-lg focus:outline-none focus:border-[#ffc107] focus:ring-2 focus:ring-[#ffc107] focus:ring-opacity-20"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#0f0f1a] mb-2">
                        Start Time
                      </label>
                      <select
                        value={bookingData.startTime}
                        onChange={(e) =>
                          setBookingData((prev) => ({
                            ...prev,
                            startTime: e.target.value,
                          }))
                        }
                        className="w-full p-3 bg-[#f9fafb] border border-[#e5e7eb] rounded-lg focus:outline-none focus:border-[#ffc107] focus:ring-2 focus:ring-[#ffc107] focus:ring-opacity-20"
                        required
                      >
                        <option value="">Select time</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#0f0f1a] mb-2">
                        End Time
                      </label>
                      <select
                        value={bookingData.endTime}
                        onChange={(e) =>
                          setBookingData((prev) => ({
                            ...prev,
                            endTime: e.target.value,
                          }))
                        }
                        className="w-full p-3 bg-[#f9fafb] border border-[#e5e7eb] rounded-lg focus:outline-none focus:border-[#ffc107] focus:ring-2 focus:ring-[#ffc107] focus:ring-opacity-20"
                        required
                      >
                        <option value="">Select time</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#0f0f1a] mb-2">
                      Duration (minutes)
                    </label>
                    <select
                      value={bookingData.durationMinutes}
                      onChange={(e) =>
                        setBookingData((prev) => ({
                          ...prev,
                          durationMinutes: parseInt(e.target.value),
                        }))
                      }
                      className="w-full p-3 bg-[#f9fafb] border border-[#e5e7eb] rounded-lg focus:outline-none focus:border-[#ffc107] focus:ring-2 focus:ring-[#ffc107] focus:ring-opacity-20"
                      required
                    >
                      <option value={15}>15 minutes</option>
                      <option value={30}>30 minutes</option>
                      <option value={45}>45 minutes</option>
                      <option value={60}>60 minutes</option>
                      <option value={90}>90 minutes</option>
                    </select>
                  </div>

                  <div className="bg-[#fffbea] rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[#0f0f1a] font-medium">
                        Total Price:
                      </span>
                      <span className="text-xl font-bold text-[#0f0f1a]">
                        ₹{bookingData.totalPrice}
                      </span>
                    </div>
                    <p className="text-[#444444] text-sm mt-1">
                      {bookingData.durationMinutes} minutes × ₹
                      {bookingData.bookingType === "chat"
                        ? selectedAstrologer.chatPricePerMinute
                        : selectedAstrologer.callPricePerMinute}
                      /min
                    </p>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowBookingModal(false);
                        setBookingError("");
                        setSelectedAstrologer(null);
                      }}
                      className="flex-1 bg-[#f9fafb] hover:bg-[#e5e7eb] text-[#444444] font-medium py-3 px-4 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleBooking}
                      className="flex-1 bg-[#ffc107] hover:bg-[#ffb300] text-[#0f0f1a] font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <Clock className="h-5 w-5 mr-2" />
                      Book Now
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AstrologerBookingPage;
