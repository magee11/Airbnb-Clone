const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  owner: String,
  // {type:mongoose.Schema.Types.ObjectId, ref:'User'},
  title: String,
  address: String,
  photos: [String],
  description: String,
  perks: [String],
  extraInfo: String,
  checkIn: String,
  checkOut: String,
  maxGuests: String,
  price: String,
});

const PlaceModel = mongoose.model('Place', placeSchema);

module.exports = PlaceModel;