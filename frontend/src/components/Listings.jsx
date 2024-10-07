import React, { useState, useEffect } from "react";
import ListingCard from "./ListingCard";
import "./Listings.css";

const Listings = ({ selectedCategory }) => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = () => {
      const mockData = [
        {
          image:
            "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzMTA4OTQ5ODA0MDcwMTE4Mw%3D%3D/original/a766e0e9-1e6f-4b88-b8d5-ce12375c6de8.png?im_w=1440&im_q=highq",
          title: "Beautiful Beach House",
          type: "Entire home",
          guests: 6,
          bedrooms: 3,
          bathrooms: 2,
          price: 150,
          rating: 4.5,
        },
        {
          image:
            "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzMTA4NzY0ODgzNzUzNjQzNw%3D%3D/original/1077cfcd-29d5-42b7-adab-19e0b620e492.jpeg?im_w=1440&im_q=highq",
          title: "Cozy Mountain Cabin",
          type: "Private room",
          guests: 2,
          bedrooms: 1,
          bathrooms: 1,
          price: 100,
          rating: 4.7,
        },
        {
          image:
            "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEyNjIzMTk3NDU3MjE4Nzg2NA%3D%3D/original/f4cbe542-3ce0-4c6f-a8f1-d2120c1b2420.jpeg?im_w=1440&im_q=highq",
          title: "Downtown Apartment",
          type: "Entire home",
          guests: 4,
          bedrooms: 2,
          bathrooms: 1,
          price: 120,
          rating: 4.2,
        },
        {
          image:
            "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE2MjI1MjI0NDQ0MzYzMjM4Mg%3D%3D/original/ae3426d1-fba4-44d4-bed2-690426f25f7a.jpeg?im_w=1440&im_q=highq",
          title: "Spacious Loft",
          type: "Private room",
          guests: 3,
          bedrooms: 1,
          bathrooms: 1,
          price: 90,
          rating: 4.0,
        },
        {
          image:
            "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzMTA4MzUyMzk5Mjc3MDU5Nw%3D%3D/original/ced15ffe-0ab5-48cf-a189-dbdeaaf04387.jpeg?im_w=1440&im_q=highq",
          title: "Modern Studio",
          type: "Entire home",
          guests: 2,
          bedrooms: 1,
          bathrooms: 1,
          price: 80,
          rating: 4.5,
        },
        {
          image:
            "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEyMzIwMTE1Njc3Njg0MTIzOQ%3D%3D/original/fb9dcb8d-7fa5-402f-91ae-fa2a26e9f097.png?im_w=1440&im_q=highq",
          title: "Charming Cottage",
          type: "Entire home",
          guests: 5,
          bedrooms: 2,
          bathrooms: 1,
          price: 110,
          rating: 4.6,
        },
        {
          image:
            "https://a0.muscache.com/im/pictures/miso/Hosting-694055224756906854/original/76f85a0c-b3e2-4f1d-9aa9-d7838f2393c6.jpeg?im_w=1440&im_q=highq",
          title: "Luxury Villa",
          type: "Entire home",
          guests: 8,
          bedrooms: 4,
          bathrooms: 3,
          price: 300,
          rating: 4.9,
        },
        {
          image:
            "https://a0.muscache.com/im/pictures/miso/Hosting-53274539/original/365299e3-f926-47ee-bcbf-606d6a0370b9.jpeg?im_w=1440&im_q=highq",
          title: "Quaint Farmhouse",
          type: "Private room",
          guests: 4,
          bedrooms: 2,
          bathrooms: 2,
          price: 150,
          rating: 4.4,
        },
        {
          image:
            "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzMTA4MzUyMzk5Mjc3MDU5Nw%3D%3D/original/ced15ffe-0ab5-48cf-a189-dbdeaaf04387.jpeg?im_w=1440&im_q=highq",
          title: "Sleek City Condo",
          type: "Entire home",
          guests: 3,
          bedrooms: 1,
          bathrooms: 1,
          price: 130,
          rating: 4.3,
        },
        {
          image:
            "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEyNjI0NzUwMDUwMTg2Mzg5MA%3D%3D/original/99417998-fa44-4c75-ae77-287c1468977b.jpeg?im_w=1440&im_q=highq",
          title: "Rustic Log Cabin",
          type: "Private room",
          guests: 2,
          bedrooms: 1,
          bathrooms: 1,
          price: 85,
          rating: 4.2,
        },
        {
          image:
            "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzMTg2NzMzNDc0MDk1Nzg4NA%3D%3D/original/b676fc8d-8250-4df0-a7cb-728b0486e371.jpeg?im_w=1440&im_q=highq",
          title: "Elegant Penthouse",
          type: "Entire home",
          guests: 4,
          bedrooms: 2,
          bathrooms: 2,
          price: 250,
          rating: 4.8,
        },
        {
          image:
            "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE4NzE3Nzg1NDA2MjM5NzY2NQ%3D%3D/original/6989d581-3f67-4cd9-8cb6-5f5c226aedc6.png?im_w=1440&im_q=highq",
          title: "Chic Studio Apartment",
          type: "Private room",
          guests: 2,
          bedrooms: 1,
          bathrooms: 1,
          price: 95,
          rating: 4.6,
        },
      ];

      setTimeout(() => {
        setProperties(mockData);
      }, 1000);
    };

    fetchProperties();
  }, []);

  const filteredProperties = selectedCategory
    ? properties.filter((property) =>
        property.title.toLowerCase().includes(selectedCategory.toLowerCase())
      )
    : properties;

  return (
    <div className="listings-container">
      {filteredProperties.map((property, index) => (
        <ListingCard key={index} property={property} />
      ))}
    </div>
  );
};

export default Listings;
