const express = require("express");
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const authRoute = require("./Routes/AuthRoute");
const { HoldingsModel } = require('./model/HoldingsModel');
const { OrdersModel } = require("./model/OrdersModel");
const { PositionsModel } = require("./model/PositionsModel");

const PORT = process.env.PORT || 3002;
const MONGO_URL = process.env.MONGO_URL;

const app = express();

// ✅ CORS Setup: Allow frontend and dashboard
const allowedOrigins = [
  "https://zerodha-clone-yx60.onrender.com",     // Frontend
  "https://dashboard-qo8b.onrender.com"          // Dashboard
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());

// ✅ Routes
app.use("/", authRoute);

app.get('/allHoldings', async (req, res) => {
  const holdings = await HoldingsModel.find({});
  res.json(holdings);
});

app.get('/allPositions', async (req, res) => {
  const positions = await PositionsModel.find({});
  res.json(positions);
});

app.post("/newOrder", async (req, res) => {
  const { name, qty, price, mode } = req.body;
  const newOrder = new OrdersModel({ name, qty, price, mode });
  await newOrder.save();
  res.send("Order saved!");
});

// ✅ MongoDB Connection
mongoose.connect(MONGO_URL)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
  });
