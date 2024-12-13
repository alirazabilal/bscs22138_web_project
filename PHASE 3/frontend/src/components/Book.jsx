import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Book.css";

const Book = () => {
  const location = useLocation();
  const { property } = location.state || {};

  if (!property) {
    return <div className="error-message">Property not found!</div>;
  }

  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [numGuests, setNumGuests] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+92");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const calc_total_price = () => {
    if (!checkInDate || !checkOutDate || !numGuests) return 0;

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const nightDifference = (checkOut - checkIn) / (1000 * 3600 * 24);

    if (nightDifference < 1) return 0;

    return nightDifference * numGuests * property.price;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!checkInDate || !checkOutDate || !phoneNumber) {
      setError("All fields are required.");
      return;
    }
    setError("");
  
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      navigate("/login");
      return;
    }
  
    const bookingData = {
      propertyId: property._id,
      propertyName: property.title,
      checkInDate,
      checkOutDate,
      numGuests,
      phoneNumber,
      countryCode,
      totalPrice: calc_total_price(),
    };
  
    try {
      const response = await axios.post(
        "http://localhost:4000/api/bookings",
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Booking response:", response.data);
  
      navigate("/");
    } catch (error) {
      console.log("Error submitting booking:", error);
      setError("There was an issue with the booking. Please try again.");
    }
  };
  

  return (
    <div className="book-container">
      <h2 className="heading">Request to Book</h2>
      <form className="booking-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Check-in Date</label>
          <input
            className="form-input"
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Check-out Date</label>
          <input
            className="form-input"
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Guests</label>
          <input
            className="form-input"
            type="number"
            value={numGuests}
            onChange={(e) => setNumGuests(e.target.value)}
            min="1"
            max="100"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Phone Number</label>
          <input
            className="form-input"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            placeholder="Enter phone number"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Country Code</label>
          <input
            className="form-input"
            type="text"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button className="submit-button" type="submit">
          Continue
        </button>
      </form>

      <hr />

      <div className="property-summary">
        <h3>Summary of Your Booking</h3>
        <p>
          <strong>Property:</strong> {property.title}
        </p>
        <p>
          <strong>Price per Night:</strong> ${property.price}
        </p>
        <p>
          <strong>Check-in Date:</strong> {checkInDate}
        </p>
        <p>
          <strong>Check-out Date:</strong> {checkOutDate}
        </p>
        <p>
          <strong>Guests:</strong> {numGuests}
        </p>
        <p>
          <strong>Total Price:</strong> ${calc_total_price()}
        </p>
      </div>
    </div>
  );
};

export default Book;
