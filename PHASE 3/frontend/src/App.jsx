import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Listings from "./components/Listings";
import Footer from "./components/Footer";
import Categories from "./components/Categories";
import ListingDetails from "./components/ListingDetails";
import Book from "./components/Book";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AdminLogin from "./components/AdminLogin";
import AdminHome from "./components/AdminHome";
import AddListing from "./components/AddListing";
import AdminBooking from "./components/AdminBooking";
import UserDetails from "./components/UserDetails";
import MyBookings from "./components/MyBookings";

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
    {
      path: "/userdetails",
      element: (
        <>
          <Navbar onSearch={handleSearch} />
          <div>
            <UserDetails />
          </div>
          <Footer />
        </>
      ),
    },
    {
      path: "/mybookings",
      element: (
        <>
          <Navbar onSearch={handleSearch} />
          <div>
            <MyBookings />
          </div>
          <Footer />
        </>
      ),
    },
    {
      path: "/signup",
      element: (
        <>
          <Navbar onSearch={handleSearch} />
          <div>
            <Signup />
          </div>
          <Footer />
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <Navbar onSearch={handleSearch} />
          <div>
            <Login />
          </div>
          <Footer />
        </>
      ),
    },
    {
      path: "/adminlogin",
      element: (
        <>
          <Navbar onSearch={handleSearch} />
          <div>
            <AdminLogin />
          </div>
          <Footer />
        </>
      ),
    },
    {
      path: "/adminhome",
      element: (
        <>
          <Navbar onSearch={handleSearch} />
          <div>
            <AdminHome />
          </div>
          <Footer />
        </>
      ),
    },
    {
      path: "/adminaddlisting",
      element: (
        <>
          <Navbar onSearch={handleSearch} />
          <div>
            <AddListing />
          </div>
          <Footer />
        </>
      ),
    },
    {
      path: "/adminbookings",
      element: (
        <>
          <Navbar onSearch={handleSearch} />
          <div>
            <AdminBooking />
          </div>
          <Footer />
        </>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
