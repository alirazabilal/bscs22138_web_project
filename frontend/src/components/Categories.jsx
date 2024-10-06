import React, { useRef } from "react";
import "./Navbar2.css";

const Categories = ({ onCategorySelect }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === "left") {
      current.scrollLeft -= 100;
    } else {
      current.scrollLeft += 100;
    }
  };

  const categories = [
    "All Listings",
    "Beautiful Beach House",
    "Cozy Mountain Cabin",
    "Downtown Apartment",
    "Spacious Loft",
    "Modern Studio",
  ];

  return (
    <div>
      <div className="scroll-bar-container">
        <button className="scroll-btn left-btn" onClick={() => scroll("left")}>
          &#8249;
        </button>

        <div className="scroll-bar" ref={scrollRef}>
          {categories.map((category, index) => (
            <span
              key={index}
              className="scroll-item"
              onClick={() => onCategorySelect(category)}
            >
              <i className="fa-solid fa-house"></i>
              <br />
              {category}
            </span>
          ))}
        </div>

        <button
          className="scroll-btn right-btn"
          onClick={() => scroll("right")}
        >
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default Categories;
