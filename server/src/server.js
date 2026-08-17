// Import app
const app = require("./app");

// Import database connection
const connectDB = require("./config/db");

// Load environment variables
require("dotenv").config();

// Connect MongoDB
connectDB();

// Define Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});