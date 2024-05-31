const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();
const dataRoutes = require("./routes/routes");
const bodyParser = require('body-parser');
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());
app.use('/', dataRoutes);

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

app.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
});
