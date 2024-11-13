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

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
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
          <Navbar />
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
          <Navbar />
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
