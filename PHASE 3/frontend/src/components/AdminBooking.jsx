import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminBooking.css";

const AdminBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const tokenadmin = localStorage.getItem("tokenadmin");
        console.log(tokenadmin);
        if (!tokenadmin) {
          setError(
            "You are not logged in as admin (CAN'T ACCESS). Please log in first."
          );
          return;
        }
        const response = await axios.get(
          "http://localhost:4000/admin/bookings",
          {
            headers: {
              Authorization: `Bearer ${tokenadmin}`,
            },
          }
        );
        setBookings(response.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to fetch bookings. Please try again.");
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="admin-bookings-container">
      <h2>Admin Booking Management</h2>
      {error && <p className="error-message">{error}</p>}

      {bookings.length > 0 ? (
        <div className="bookings-grid">
          {bookings.map((booking) => (
            <div key={booking._id} className="booking-card">
              <h3>{booking.propertyName}</h3>
              <p>
                <strong>Booking ID:</strong> {booking._id}
              </p>
              <p>
                <strong>Property ID:</strong> {booking.property}
              </p>
              <p>
                <strong>User ID:</strong> {booking.user}
              </p>
              <p>
                <strong>Property Name:</strong> {booking.propertyName}
              </p>
              <p>
                <strong>Check-in Date:</strong>{" "}
                {new Date(booking.checkIn).toLocaleDateString()}
              </p>
              <p>
                <strong>Check-out Date:</strong>{" "}
                {new Date(booking.checkOut).toLocaleDateString()}
              </p>
              <p>
                <strong>Total Price:</strong> ${booking.totalPrice}
              </p>
              <p>
                <strong>Guests:</strong> {booking.guests}
              </p>
              <p>
                <strong>Status:</strong> {booking.status}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default AdminBooking;
