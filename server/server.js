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
  "mongodb+srv://naman:naman@cluster0.wfqx2hc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
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
  orderId: { type: String, required: true }, // unique tracking code
  productId: { type: String, required: true }, // product id
  productName: { type: String, required: true }, // product name
  quantity: { type: Number, required: true }, //  quantity

  address: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    alternateMobile: { type: String },
    houseNo: { type: String, required: true },
    streetNo: { type: String },
    landmark: { type: String },
    town: { type: String, required: true },
    district: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
  },

  status: { type: String, default: "Pending" }, // order status
  createdAt: { type: Date, default: Date.now }
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

// Fetch all orders
app.get("/getorders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update order status (admin)
app.put("/getorders/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  server
app.listen(5000, () => console.log("Server running on http://localhost:5000"));
