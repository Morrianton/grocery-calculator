require('dotenv').config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();
const isProd = process.env.NODE_ENV === 'production';
console.log(`Running in ${isProd ? 'Production' : 'Development'} mode`)

// Dynamically choose the correct connection string
const mongoURI = isProd
  ? process.env.MONGODB_URI_PROD
  : process.env.MONGODB_URI_LOCAL;

// Connect to MongoDB
mongoose.connect(mongoURI)
.then(() => console.log(`✅ Connected to MongoDB (${isProd ? 'Production' : 'Development'})`))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(morgan("tiny"));

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Grocery Items routes
const groceryItemsRouter = require('./routes/groceryItems');
app.use('/api/grocery-items', groceryItemsRouter);

// Serve static files from the Ionic app build directory
const staticDir = path.join(__dirname, "../www");
app.use(express.static(staticDir));

// Serve index.html for any remaining routes
app.get('/', (req, res) => {
  res.sendFile(path.join(staticDir, "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
