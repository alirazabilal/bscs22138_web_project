import React from "react";
import "./Footer.css"; 
import "./Footer2.css";

const Footer2 = () => {
  return (
    <>
      <hr />

      <footer className="footer">
        <div className="footer-column">
          <h4>Support</h4>
          <ul>
            <li>
              <a href="#">Help Center</a>
            </li>
            <li>
              <a href="#">AirCover</a>
            </li>
            <li>
              <a href="#">Anti-discrimination</a>
            </li>
            <li>
              <a href="#">Disability support</a>
            </li>
            <li>
              <a href="#">Cancellation options</a>
            </li>
            <li>
              <a href="#">Report neighborhood concern</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Hosting</h4>
          <ul>
            <li>
              <a href="#">Airbnb your home</a>
            </li>
            <li>
              <a href="#">AirCover for Hosts</a>
            </li>
            <li>
              <a href="#">Hosting resources</a>
            </li>
            <li>
              <a href="#">Community forum</a>
            </li>
            <li>
              <a href="#">Hosting responsibly</a>
            </li>
            <li>
              <a href="#">Airbnb-friendly apartments</a>
            </li>
            <li>
              <a href="#">Join a free Hosting class</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Airbnb</h4>
          <ul>
            <li>
              <a href="#">Newsroom</a>
            </li>
            <li>
              <a href="#">New features</a>
            </li>
            <li>
              <a href="#">Careers</a>
            </li>
            <li>
              <a href="#">Investors</a>
            </li>
            <li>
              <a href="#">Gift cards</a>
            </li>
            <li>
              <a href="#">Airbnb.org emergency stays</a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Footer2;
