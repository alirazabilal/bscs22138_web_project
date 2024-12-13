import React, { useEffect, useState } from "react";
import "./MyBookings.css";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found, please log in.");
          return;
        }
        const response = await fetch(
          "http://localhost:4000/api/bookings/user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch bookings");
        const data = await response.json();
        setBookings(data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Unable to load bookings.");
      }
    };

    fetchBookings();
  }, []);

  const handleDeleteBooking = async (bookingId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/bookings/${bookingId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to delete booking");

      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== bookingId)
      );
    } catch (err) {
      console.error("Error deleting booking:", err);
      setError("Unable to delete booking.");
    }
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="my-bookings-container">
      <h1>Your Bookings</h1>
      {bookings.length === 0 ? (
        <p>You have no bookings.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id}>
              <div className="booking-card">
                <div className="booking-info">
                  <h3>{booking.propertyName}</h3>
                  <p>
                    <strong>Check-in:</strong>{" "}
                    {new Date(booking.checkIn).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Check-out:</strong>{" "}
                    {new Date(booking.checkOut).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Total Price:</strong> ${booking.totalPrice}
                  </p>
                </div>
                <div className="booking-card-footer">
                  <span className={`status ${booking.status.toLowerCase()}`}>
                    {booking.status}
                  </span>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteBooking(booking._id)}
                  >
                    Delete Booking
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBookings;
