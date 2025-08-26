// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(cors());
app.use(express.json());

//  MongoDB
mongoose.connect(
  "Your_MongoDB_Connection_String_Here",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Schemas
const productSchema = new mongoose.Schema({
  productId: { type: String, unique: true, default: uuidv4 }, //  UUID
  name: { type: String, required: true },
  weighingCapacity: { type: String, required: true },
  category: { type: String, required:true},
  brand: { type: String, required: true },
  usageApplication: { type: String },
  material: { type: String },
  modelNumber: { type: String },
  calibration: { type: String },
  displayType: { type: String },
  panSize: { type: String },
  accuracy: { type: String },
  automationGrade: { type: String },
  warranty: { type: String },
  displayColor: { type: String },
  dealIn: { type: String },
  powerSupply: { type: String },
  frequency: { type: String },
  numberOfDigits: { type: Number },
  humidity: { type: String },
  color: { type: String },
  batteryType: { type: String },
  size: { type: String },

  
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  images: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);

const OrderSchema = new mongoose.Schema({
  orderId: String, // tracking code
  items: [{ 
    productId: String, 
    quantity: Number 
  }],
  status: { type: String, default: "Pending" },
  mobile: { type: String, required: true },  // customer's mobile number
  
  email: { type: String, required: true },   // customer's email address
});


const Order = mongoose.model("Order", OrderSchema);

// Routes

// Add product (admin)
app.post("/products", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

// Get all products
app.get("/getproducts", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

//product with productId
app.get("/getproducts/:productId", async (req, res) => {
  try {
    const product = await Product.findOne({ productId: req.params.productId });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Place order 
app.post("/orders", async (req, res) => {
  const orderId = uuidv4().slice(0, 8); // short tracking code
  const order = new Order({ orderId, ...req.body });
  await order.save();
  res.json({ message: "Order placed!", orderId });
});

// Track order
app.get("/orders/:orderId", async (req, res) => {
  const order = await Order.findOne({ orderId: req.params.orderId });
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
});

// Update order status (admin)
app.put("/orders/:orderId", async (req, res) => {
  const order = await Order.findOneAndUpdate(
    { orderId: req.params.orderId },
    { status: req.body.status },
    { new: true }
  );
  res.json(order);
});

//  server
app.listen(5000, () => console.log("Server running on http://localhost:5000"));
