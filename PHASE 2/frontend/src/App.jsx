import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Listings from "./components/Listings";
import Footer from "./components/Footer";
import Categories from "./components/Categories";
import ListingDetails from "./components/ListingDetails";
import Book from "./components/Book";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [listings, setListings] = useState([]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/listings/search?query=${searchTerm}`
        );
        const data = await response.json();
        setListings(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };
    fetchListings();
  }, [searchTerm]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar onSearch={handleSearch} />
          <div>
            <Categories onCategorySelect={handleCategorySelect} />
            <Listings
              listings={listings}
              selectedCategory={selectedCategory}
              searchTerm={searchTerm}
            />
          </div>
          <Footer />
        </>
      ),
    },
    {
      path: "/details/:id",
      element: (
        <>
          <Navbar onSearch={handleSearch} />
          <div>
            <ListingDetails />
          </div>
          <Footer />
        </>
      ),
    },
    {
      path: "/book/:id",
      element: (
        <>
          <Navbar onSearch={handleSearch} />
          <div>
            <Book />
          </div>
          <Footer />
        </>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
