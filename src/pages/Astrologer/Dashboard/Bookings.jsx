import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATH } from "../../../utils/apiPath";
import { UserContext } from "../../../Context/UserContext";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axiosInstance.get(API_PATH.ASTROLOGER.VIEW_BOOKINGS);
        setBookings(res.data.data || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-yellow-50 p-4">
      <h1 className="text-2xl font-bold text-black mb-6">Your Bookings</h1>

      {loading ? (
        <p className="text-black">Loading...</p>
      ) : bookings.length === 0 ? (
        <p className="text-black">No bookings found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-xl shadow-md p-4 border border-yellow-200"
            >
              <h2 className="text-lg font-semibold text-black mb-2">
                {booking.user.name}
              </h2>
              <p className="text-sm text-black">
                <span className="font-semibold">Email:</span>{" "}
                {booking.user.email}
              </p>
              <p className="text-sm text-black">
                <span className="font-semibold">Phone:</span>{" "}
                {booking.user.phone}
              </p>
              <p className="text-sm text-black">
                <span className="font-semibold">Booking Type:</span>{" "}
                {booking.bookingType}
              </p>
              <p className="text-sm text-black">
                <span className="font-semibold">Date:</span>{" "}
                {new Date(booking.date).toLocaleDateString()}
              </p>
              <p className="text-sm text-black">
                <span className="font-semibold">Time:</span>{" "}
                {booking.timeSlot.startTime} - {booking.timeSlot.endTime}
              </p>
              <p className="text-sm text-black">
                <span className="font-semibold">Duration:</span>{" "}
                {booking.durationMinutes} mins
              </p>
              <p className="text-sm text-black">
                <span className="font-semibold">Price:</span>{" "}
                {booking.totalPrice !== null
                  ? `₹${booking.totalPrice}`
                  : "Free"}
              </p>
              <p className="text-sm text-black">
                <span className="font-semibold">Status:</span> {booking.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;
