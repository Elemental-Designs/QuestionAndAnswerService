const mongoose = require('mongoose');

mongoose.connect();

const reviews = new mongoose.Schema({
  product_id: Number,
  rating: Number,
  date: Date,
  summary: String,
  body: String,
  recommend: Boolean,
  reported: Boolean,
  response: String,
  reviewer_name: String,
  helpfulness: Number,
  photos: [{ url: String }],
  reviewer_email: String,
});

const characteristics = new mongoose.Schema({
  product_id: Number,
  characteristic_id: Number,
  characteristic: String,
  value: Number,
});

const Characteristic = mongoose.model('Characteristic', characteristics);
const Reviews = mongoose.model('Reviews', reviews);