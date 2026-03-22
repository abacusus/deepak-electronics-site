// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Razorpay from "razorpay";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

//  MongoDB
mongoose.connect(
  process.env.mongod_db,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);


// razorpay payment gateway keys  
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Schemas
const productSchema = new mongoose.Schema({
  productId: { type: String, unique: true, default: uuidv4 }, //  UUID
  name: { type: String, required: true },
  weighingCapacity: { type: String, required: true },
  category: { type: String, required: true },
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



  feature1: { type: String, default: "" },
  feature2: { type: String, default: "" },
  feature3: { type: String, default: "" },
  feature4: { type: String, default: "" },
  feature5: { type: String, default: "" },

  extraDescription: { type: String, default: "" },
  description: { type: String, default: "" },

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


  paymentMethod: { type: String, required: true }, // "Cash" or "Online"
  paymentStatus: { type: String, default: "Pending" }, // Pending, Paid, Failed
  razorpayOrderId: { type: String },
  razorpayPaymentId: { type: String },

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


const ProductVidSchema = new mongoose.Schema({
  videoId: { type: String, unique: true, default: uuidv4 }, //  UUID
  title: { type: String, required: true },
  productlink: { type: String, required: true },
  videolink: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  description: { type: String, required: true }

});

const ProductVid = mongoose.model("ProductVid", ProductVidSchema);


// Routes

// Add product (admin)
app.post("/api/products", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});


// Add productvid (admin)
app.post("/api/productvid", async (req, res) => {
  const productvid = new ProductVid(req.body);
  await productvid.save();
  res.json(productvid);
});



// Get all products
app.get("/api/getproducts", async (req, res) => {
  try {
    const { category } = req.query;

    let products;
    if (category) {
      products = await Product.find({ category }).lean();
    } else {
      products = await Product.find().lean();
    }

    // Attach order counts
    const productsWithOrders = await Promise.all(products.map(async (p) => {
      const orderCount = await Order.countDocuments({ productId: p.productId });
      return { ...p, orderCount };
    }));

    res.json(productsWithOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});



app.get("/api/getproducts/:productId", async (req, res) => {
  try {

    const product = await Product.findOne({ productId: req.params.productId });

    if (!product) return res.status(404).json({ error: "Product not found" });

    const schema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product.name,
      "description": product.description || product.extraDescription,
      "image": product.images?.[0] || "",
      "brand": {
        "@type": "Brand",
        "name": product.brand
      },
      "offers": {
        "@type": "Offer",
        "price": product.price,
        "priceCurrency": "INR",
        "availability": product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
        "url": `https://yourdomain.com/product/${product.productId}`
      }
    };

    res.json({ product, schema });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Place order (Cash)
app.post("/api/orders", async (req, res) => {
  try {
    const orderId = uuidv4().slice(0, 8);

    const order = new Order({
      orderId,
      ...req.body,
    });

    await order.save();
    res.json({ message: "Order placed!", orderId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Create Razorpay Order
app.post("/api/create-razorpay-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: Math.round(amount * 100), // Razorpay works in paise
      currency: "INR",
      receipt: "receipt_" + uuidv4().slice(0, 8),
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Verify Payment and Create Order (Online)
app.post("/api/verify-payment", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      productId,
      productName,
      quantity,
      address
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isSignatureValid = expectedSignature === razorpay_signature;

    if (isSignatureValid) {
      const orderId = uuidv4().slice(0, 8);

      const order = new Order({
        orderId,
        productId,
        productName,
        quantity,
        paymentMethod: "Online",
        paymentStatus: "Paid",
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        address,
      });

      await order.save();
      res.json({ message: "Payment verified and order placed!", orderId });
    } else {
      res.status(400).json({ message: "Invalid signature" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

//status
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
    env: process.env.NODE_ENV || "development"
  });
});

// Track order
app.get("/api/orders/:orderId", async (req, res) => {
  const order = await Order.findOne({ orderId: req.params.orderId });
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
});

// Fetch all orders
app.get("/api/getorders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Fetch Product Videos

app.get("/api/productvid", async (req, res) => {
  try {
    const productvids = await ProductVid.find().sort({ createdAt: -1 });
    res.json(productvids);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update product (admin)
app.put("/api/products/:productId", async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { productId: req.params.productId },
      req.body,
      { new: true }
    );
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete product (admin)
app.delete("/api/products/:productId", async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ productId: req.params.productId });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update order status (admin)
app.put("/api/getorders/:id", async (req, res) => {
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
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});