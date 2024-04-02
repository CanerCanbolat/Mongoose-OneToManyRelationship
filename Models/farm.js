const mongoose = require("mongoose");
const { Schema } = mongoose;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationshipDB");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const productSchema = new Schema({
  name: String,
  price: Number,
  season: {
    type: String,
    enum: ["Spring", "Summer", "Fall", "Winter"],
  },
});

const farmSchema = new Schema({
  name: String,
  city: String,
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

const Product = mongoose.model("Product", productSchema);
const Farm = mongoose.model("Farm", farmSchema);

// Product.insertMany([
//   { name: "Goddes Melon", price: 4.99, season: "Summer" },
//   { name: "Sugar Baby Watermelon", price: 2.99, season: "Fall" },
//   { name: "Asparagus", price: 3.99, season: "Spring" },
// ]);
const makeFarm = async () => {
  const farm = new Farm({ name: "Fulll Belly Farms", city: "Guinda, CA" });
  const melon = await Product.findOne({ name: "Goddes Melon" });
  farm.products.push(melon);
  farm.save();
  console.log(farm);
};

makeFarm();
