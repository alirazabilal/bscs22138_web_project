import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ onSearch }) => {
  const [activeLink, setActiveLink] = useState("home");
  const [where, setWhere] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  // Check if the user is logged in (based on the token in localStorage)
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Update state based on the presence of the token
  }, []); // This effect only runs on mount (when the component is first loaded)

  // Check if the user is logged in (based on the token in localStorage)
  useEffect(() => {
    const tokenadmin = localStorage.getItem("tokenadmin");
    setIsAdminLoggedIn(!!tokenadmin); // Update state based on the presence of the token
  }, []); // This effect only runs on mount (when the component is first loaded)

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // Manually extract user ID from the JWT payload
        const payload = JSON.parse(atob(token.split(".")[1])); // Decode Base64 payload
        setUserId(payload.id); // Store user ID
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
    localStorage.removeItem("token"); // Remove token from localStorage
    setIsLoggedIn(false); // Update state to reflect user is logged out
    navigate("/"); // Optionally navigate to home page after logout
  };

  const handleLogoutAdmin = () => {
    localStorage.removeItem("tokenadmin"); // Remove token from localStorage
    setIsAdminLoggedIn(false); // Update state to reflect user is logged out
    navigate("/"); // Optionally navigate to home page after logout
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
                      to="/adminhome"
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
                      to="/"
                    >
                      About
                    </NavLink>
                  </>
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

            <form className="round d-flex" role="search">
              <i className="fa-solid fa-bars"></i>
              <i className="profile fa-solid fa-user"></i>
            </form>

            {/* Conditionally render login/signup or profile/logout buttons */}
            {!isLoggedIn && !isAdminLoggedIn ? (
              <>
                <NavLink to="/login">
                  <button className="btn btn-primary">LogIn</button>
                </NavLink>
                <NavLink to="/signup">
                  <button className="btn btn-primary">SignUp</button>
                </NavLink>
                <NavLink to="/adminlogin">
                  <button className="btn btn-primary">Admin Login</button>
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
