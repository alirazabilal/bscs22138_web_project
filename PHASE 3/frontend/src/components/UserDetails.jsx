import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./UserDetails.css";

const UserDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = location.state || {};
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setError("User ID is missing");
      return;
    }
    console.log(userId);
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/auth/userdetails/${userId}`
        );
        if (!response.ok) throw new Error("Failed to fetch user details");
        const data = await response.json();
        setUserDetails(data);
      } catch (err) {
        console.error("Error fetching user details:", err);
        setError("Unable to load user details.");
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!userDetails) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <div className="user-details-container">
      <div className="user-details-card">
        <div className="user-left-section">
          <img
            src="https://via.placeholder.com/150"
            alt="User Avatar"
            className="user-avatar"
          />
          <h2>{userDetails.name}</h2>
          <p className="user-role">{userDetails.role ? "Host" : "Guest"}</p>
        </div>

        <div className="user-center-section">
          <h1>Welcome, "{userDetails.name}"</h1>
          <div className="user-info">
            <p>
              <strong>Username:</strong> {userDetails.name}
            </p>
            <p>
              <strong>Email:</strong> {userDetails.email}
            </p>
            <p>
              <strong>Phone:</strong> {userDetails.phone || "Not provided"}
            </p>
          </div>
        </div>

        <div className="user-right-section">
          <h3>Quick Links</h3>
          <ul className="quick-links">
            <li>
              <a href="#">View Your Bookings</a>
            </li>
          </ul>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/mybookings")}
          >
            Go to My Bookings
          </button>
          <button className="btn btn-secondary" onClick={() => navigate("/")}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
