import React, { useState } from "react";
import "./Navbar2.css";

const Search = () => {
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  return (
    <div>
      <div className="input-container">
        <div className="round">
          <input
            type="text"
            className="input-field"
            placeholder="Where"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            type="text"
            className="input-field"
            placeholder="Check-In"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
          <input
            type="text"
            className="input-field"
            placeholder="Check-Out"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
          <button className="search-btn">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
