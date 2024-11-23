const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    image: { type: String, required: true },
    image2: { type: String },
    image3: { type: String },
    image4: { type: String },
    image5: { type: String },
    title: { type: String, required: true },
    type: { type: String, required: true },
    guests: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    rating2: { type: Number },
    rating3: { type: Number },
    rating4: { type: Number },
    rating5: { type: Number },
    rating6: { type: Number },
    rating7: { type: Number },
    detail1: { type: String },
    detail2: { type: String },
    detail3: { type: String },
    detail4: { type: String },
    detail5: { type: String },
    detail6: { type: String },
    list1: { type: String },
    list2: { type: String },
    list3: { type: String },
    list4: { type: String },
    list5: { type: String },
    list6: { type: String },
    list7: { type: String },
    list8: { type: String },
    list9: { type: String },
    list10: { type: String },
  },
  { collection: "mockData" }
);

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
