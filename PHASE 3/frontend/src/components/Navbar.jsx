import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ onSearch }) => {
  const [activeLink, setActiveLink] = useState("home");
  const [where, setWhere] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isHost, setIsHost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const tokenadmin = localStorage.getItem("tokenadmin");
    setIsAdminLoggedIn(!!tokenadmin);
  }, []);

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    setIsHost(!!userRole);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUserId(payload.id);
        setIsLoggedIn(true);
      } catch (err) {
        console.error("Error decoding token:", err);
        setIsLoggedIn(false);
      }
    }
  }, []);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const handleSearch = () => {
    onSearch(where);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    setIsHost(false);
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleLogoutAdmin = () => {
    localStorage.removeItem("tokenadmin");
    setIsAdminLoggedIn(false);
    navigate("/");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          {isAdminLoggedIn ? (
            <>
              <NavLink className="nav-red navbar-brand" to="/adminhome">
                <img
                  className="image-logo"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzq_r2hwsfNjAKNln-l_uSE_VM35iLTxjctQ&s"
                  alt="airbnb"
                />
              </NavLink>
            </>
          ) : (
            <>
              <NavLink className="nav-red navbar-brand" to="/">
                <img
                  className="image-logo"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzq_r2hwsfNjAKNln-l_uSE_VM35iLTxjctQ&s"
                  alt="airbnb"
                />
              </NavLink>
            </>
          )}

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
                {isAdminLoggedIn ? (
                  <>
                    <NavLink
                      className={`nav-link ${
                        activeLink === "home" ? "active" : ""
                      }`}
                      onClick={() => handleLinkClick("home")}
                      to="/adminhome"
                    >
                      Home
                    </NavLink>
                  </>
                ) : (
                  <>
                    <NavLink
                      className={`nav-link ${
                        activeLink === "home" ? "active" : ""
                      }`}
                      onClick={() => handleLinkClick("home")}
                      to="/"
                    >
                      Home
                    </NavLink>
                  </>
                )}
              </li>
              <li className="nav-item">
                {/* <NavLink
                  className={`nav-link ${
                    activeLink === "details" ? "active" : ""
                  }`}
                  onClick={() => handleLinkClick("details")}
                  to="/details/:id"
                >
                  Details
                </NavLink> */}
              </li>
              <li className="nav-item">
                {isAdminLoggedIn ? (
                  <>
                    <NavLink
                      className={`nav-link ${
                        activeLink === "experiences" ? "active" : ""
                      }`}
                      onClick={() => handleLinkClick("experiences")}
                      to="/adminhome"
                    >
                      Experiences
                    </NavLink>
                  </>
                ) : (
                  <>
                    <NavLink
                      className={`nav-link ${
                        activeLink === "experiences" ? "active" : ""
                      }`}
                      onClick={() => handleLinkClick("experiences")}
                      to="/"
                    >
                      Experiences
                    </NavLink>
                  </>
                )}
              </li>
              <li className="nav-item">
                {isAdminLoggedIn ? (
                  <>
                    <NavLink
                      className={`nav-link ${
                        activeLink === "about" ? "active" : ""
                      }`}
                      onClick={() => handleLinkClick("about")}
                      to="/about"
                    >
                      About
                    </NavLink>
                  </>
                ) : (
                  <>
                    <NavLink
                      className={`nav-link ${
                        activeLink === "about" ? "active" : ""
                      }`}
                      onClick={() => handleLinkClick("about")}
                      to="/about"
                    >
                      About
                    </NavLink>
                  </>
                )}
                {isAdminLoggedIn && (
                  <NavLink
                    className={`nav-link ${
                      activeLink === "about" ? "active" : ""
                    }`}
                    to="/adminbookings"
                  >
                    Check bookings
                  </NavLink>
                )}
              </li>
            </ul>
            {isAdminLoggedIn ? (
              <>
                <NavLink className="textabout" to="/adminhome">
                  Airbnb Your Home
                </NavLink>
              </>
            ) : (
              <>
                <NavLink className="textabout" to="/">
                  Airbnb Your Home
                </NavLink>
              </>
            )}

            {isHost ? (
              <>
                <div className="p-2">
                  <NavLink className="textabout" to="/hostaddhome">
                    Add a listing-HOST
                  </NavLink>
                </div>
              </>
            ) : (
              <></>
            )}

            <form className="round d-flex" role="search">
              <i className="fa-solid fa-bars"></i>
              <i className="profile fa-solid fa-user"></i>
            </form>

            {!isLoggedIn && !isAdminLoggedIn ? (
              <>
                <NavLink to="/login">
                  <button className="btn btn-primary">
                    <i className="fa-solid fa-user">Login</i>
                  </button>
                </NavLink>
                <NavLink to="/signup">
                  <button className="btn btn-primary">
                    <i className="fa-solid fa-users">Signup</i>
                  </button>
                </NavLink>
                <NavLink to="/adminlogin">
                  <button className="btn btn-primary">
                    <i className="fa-solid fa-user-secret">Admin Login</i>
                  </button>
                </NavLink>
              </>
            ) : (
              <>
                {isLoggedIn && (
                  <NavLink to="/userdetails" state={{ userId }} className="">
                    Profile
                  </NavLink>
                )}

                {isAdminLoggedIn ? (
                  <button onClick={handleLogoutAdmin} className="">
                    LogOutadmin
                  </button>
                ) : (
                  <button onClick={handleLogout} className="">
                    LogOut
                  </button>
                )}
              </>
            )}
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
