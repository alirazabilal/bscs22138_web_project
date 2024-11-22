import React, { useState, useEffect } from "react";
import ListingCard from "./ListingCard";
import axios from "axios";
import "./Listings.css";

const Listings = ({ selectedCategory, searchTerm }) => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("http://localhost:4000/listings");
        setProperties(response.data);
        setFilteredProperties(response.data);
      } catch (err) {
        console.error("Error fetching listings:", err);
      }
    };
    fetchProperties();
  }, []);

  useEffect(() => {
    const filterProperties = () => {
      const filtered = properties.filter((property) => {
        console.log(selectedCategory);
        const matchesCategory = selectedCategory
          ? property.category.toLowerCase() === selectedCategory.toLowerCase()
          : true;

        const matchesSearchTerm = searchTerm
          ? property.title.toLowerCase().includes(searchTerm.toLowerCase())
          : true;

        console.log(matchesSearchTerm);

        return matchesCategory && matchesSearchTerm;
      });
      setFilteredProperties(filtered);
    };

    filterProperties();
  }, [properties, selectedCategory, searchTerm]);

  return (
    <div className="listings-container">
      {filteredProperties.length > 0 ? (
        filteredProperties.map((property, index) => (
          <ListingCard key={index} property={property} />
        ))
      ) : (
        <p>No listings match your search criteria.</p>
      )}
    </div>
  );
};

export default Listings;
