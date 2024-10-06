import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("home");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            airbnb
          </a>
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
                <a
                  className={`nav-link ${
                    activeLink === "home" ? "active" : ""
                  }`}
                  onClick={() => handleLinkClick("home")}
                  href="#"
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    activeLink === "experiences" ? "active" : ""
                  }`}
                  onClick={() => handleLinkClick("experiences")}
                  href="#"
                >
                  Experiences
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    activeLink === "about" ? "active" : ""
                  }`}
                  onClick={() => handleLinkClick("about")}
                  href="#"
                >
                  About
                </a>
              </li>
            </ul>
            <a className="textabout" href="#">
              Airbnb Your Home
            </a>

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
            placeholder="where"
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
          <input className="form-control me-2" type="text" placeholder="who" />
          <button className="round-btn">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
