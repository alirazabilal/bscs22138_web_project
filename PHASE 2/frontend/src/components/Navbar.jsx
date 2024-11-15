import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ onSearch }) => {
  const [activeLink, setActiveLink] = useState("home");
  const [where, setWhere] = useState("");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const handleSearch = () => {
    onSearch(where);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <NavLink className="nav-red navbar-brand" to="/">
            <img
              className="image-logo"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzq_r2hwsfNjAKNln-l_uSE_VM35iLTxjctQ&s"
              alt="airbnb"
            />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className={`nav-link ${
                    activeLink === "home" ? "active" : ""
                  }`}
                  onClick={() => handleLinkClick("home")}
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={`nav-link ${
                    activeLink === "details" ? "active" : ""
                  }`}
                  onClick={() => handleLinkClick("details")}
                  to="/details/:id"
                >
                  Details
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={`nav-link ${
                    activeLink === "experiences" ? "active" : ""
                  }`}
                  onClick={() => handleLinkClick("experiences")}
                  to="/"
                >
                  Experiences
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={`nav-link ${
                    activeLink === "about" ? "active" : ""
                  }`}
                  onClick={() => handleLinkClick("about")}
                  to="/"
                >
                  About
                </NavLink>
              </li>
            </ul>
            <NavLink className="textabout" to="/">
              Airbnb Your Home
            </NavLink>
            <form className="round d-flex" role="search">
              <i className="fa-solid fa-bars"></i>
              <i className="profile fa-solid fa-user"></i>
            </form>
            <button className="btn btn-primary">LogIn</button>
            <button className="btn btn-primary">SignUp</button>
          </div>
        </div>
      </nav>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="center-input">
          <input
            className="form-control me-2"
            type="text"
            placeholder="Where"
            value={where}
            onChange={(e) => setWhere(e.target.value)}
          />
          <input
            className="form-control me-2"
            type="text"
            placeholder="check-in"
          />
          <input
            className="form-control me-2"
            type="text"
            placeholder="check-out"
          />
          <button className="round-btn2" onClick={handleSearch}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
