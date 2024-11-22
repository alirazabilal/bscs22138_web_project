import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ListingDetails.css";
import { useNavigate } from "react-router-dom";

const ListingDetails = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`http://localhost:4000/listings/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProperty(data);
        } else {
          setError("Property data not found.");
        }
      } catch (err) {
        setError("Failed to fetch property data.");
      }
    };

    fetchProperty();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!property) {
    return <div>Loading property data...</div>;
  }

  console.log({ id });

  const gotobookingpage = (property) => {
    navigate(`/book/${property.id}`, { state: { property } });
  };

  return (
    <div>
      <h2 className="titler">{property.title}</h2>
      <div className="div_img">
        <img
          src={property.image}
          alt={property.title}
          className="imgall property-image1"
        />
        <div className="cont">
          <img
            src={property.image2}
            alt={property.title}
            className="imgall property-image2"
          />
          <img
            src={property.image3}
            alt={property.title}
            className="imgall property-image3"
          />
        </div>
        <div className="cont">
          <img
            src={property.image4}
            alt={property.title}
            className="imgall property-image4"
          />
          <img
            src={property.image5}
            alt={property.title}
            className="imgall property-image5"
          />
        </div>
      </div>
      <div className="hero1">
        <p>{property.type}</p>
        <div className="bedsbaths">
          <p>{property.bedrooms} Beds</p>
          <p>-{property.bathrooms} Bathrooms----</p>
          <p>-{property.price} /-Price</p>
        </div>
      </div>
      <hr className="row" />
      <div className="hero2">
        <div className="c1">
          <div className="wrap">
            <i className="pic fa-solid fa-bed"></i>
            <div>
              <p>{property.detail1}</p>
              <p>{property.detail2}</p>
            </div>
          </div>
          <div className="wrap">
            <i className="pic fa-solid fa-mountain"></i>
            <div>
              <p>{property.detail3}</p>
              <p>{property.detail4}</p>
            </div>
          </div>
          <div className="wrap">
            <i className="pic fa-solid fa-train-tram"></i>
            <div>
              <p>{property.detail5}</p>
              <p>{property.detail6}</p>
            </div>
          </div>
        </div>

        <div className="tobooking">
          <p>${property.price}/- night</p>
          <button className="reserve" onClick={() => gotobookingpage(property)}>
            Book
          </button>
        </div>
      </div>
      <hr className="row" />
      <div className="hero3">
        <h3>About this place</h3>
        <p>
          Room can accomodate {property.guests} Guests, in quiet area, 15
          minutes walk from the train station and the city center, 10 minutes'
          walk from the conservatory, omega zenith and mont faron hikes. Bus 20
          on the street provides access to the Mourillon beaches. Parking spaces
          on the street.
        </p>
        <h3>Guest access</h3>
        <p>Possibility of kitchen access</p>
      </div>
      <hr className="row" />
      <div className="hero4">
        <h3>Where you will sleep</h3>
        <div className="boxer">
          <p>Bedroom</p>
          <p>{property.bedrooms} bed/s</p>
        </div>
      </div>
      <hr className="row" />
      <div className="hero5">
        <h3>What this place offers</h3>
        <div className="item">
          <i className="fa-solid fa-utensils"></i>
          <p>{property.list1}</p>
          <i className="fa-solid fa-wifi"></i>
          <p>WiFi</p>
        </div>
        <div className="item">
          <i className="fa-solid fa-house-laptop"></i>
          <p>{property.list2}</p>
          <i className="fa-solid fa-tv"></i>
          <p>TV</p>
        </div>
        <div className="item">
          <i className="fa-solid fa-sink"></i>
          <p>{property.list3}</p>
          <i className="fa-solid fa-fire"></i>
          <p>{property.list4}</p>
        </div>
        <div className="item">
          <i className="fa-solid fa-ear-deaf"></i>
          <p>{property.list5}</p>
          <i className="fa-solid fa-lock"></i>
          <p>{property.list6}</p>
        </div>{" "}
        <div className="item">
          <i className="fa-solid fa-bell"></i>
          <p>{property.list7}</p>
          <i className="fa-solid fa-bell"></i>
          <p>{property.list8}</p>
        </div>
      </div>
      <div className="ratings">
        <div className="rate">
          <i className="fa-solid fa-wand-magic"></i>
          <p>{property.rating}</p>
          <i className="fa-solid fa-wand-magic"></i>
        </div>
        <div className="rate2">
          <h3>Guest favorite</h3>
          <p>
            One of the most loved homes on Airbnb based on ratings, reviews, and
            reliability
          </p>
        </div>
        <hr />
        <div className="vitems">
          <ul className="ul-item">
            <li>Cleanliness</li>
            <li>Accuracy</li>
            <li>Check-in</li>
            <li>Communication</li>
            <li>Location</li>
            <li>Value</li>
          </ul>
          <ul className="ul-item">
            <li>{property.rating2}</li>
            <li>{property.rating3}</li>
            <li>{property.rating4}</li>
            <li>{property.rating5}</li>
            <li>{property.rating6}</li>
            <li>{property.rating7}</li>
          </ul>
          <ul className="ul-item">
            <li>
              <i className="pic fa-solid fa-shower"></i>
            </li>
            <li>
              <i className="pic fa-solid fa-check"></i>
            </li>
            <li>
              <i className="pic fa-solid fa-key"></i>
            </li>
            <li>
              <i className="pic fa-solid fa-tty"></i>
            </li>
            <li>
              <i className="pic fa-solid fa-location-dot"></i>
            </li>
            <li>
              <i className="pic fa-solid fa-tag"></i>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;
