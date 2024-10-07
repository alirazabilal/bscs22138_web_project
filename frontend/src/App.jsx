import react, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";
import Navbar from "./components/Navbar";
import Listings from "./components/Listings";
import Footer from "./components/Footer";
import Categories from "./components/Categories";
function App() {
  const [count, setCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategorySelect = (category) => {
    if (category === "All Listings") {
      setSelectedCategory("");
    } else {
      setSelectedCategory(category);
    }
  };
  return (
    <>
      <Navbar />
      <div>
        <Categories onCategorySelect={handleCategorySelect} />
        <Listings selectedCategory={selectedCategory} />
      </div>
      <Footer />
    </>
  );
}

export default App;
