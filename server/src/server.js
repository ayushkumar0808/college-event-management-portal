// Import app
const app = require("./app");

// Import database connection
const connectDB = require("./config/db");

// Load environment variables
require("dotenv").config();

// Connect MongoDB
connectDB();

// Define Port
const PORT = process.env.PORT ;

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});