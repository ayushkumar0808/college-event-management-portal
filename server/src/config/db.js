// const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     const connection = await mongoose.connect(process.env.MONGO_URI);

//     console.log(`MongoDB Connected: ${connection.connection.host}`);
//   } catch (error) {
//     console.error(`MongoDB Connection Failed: ${error.message}`);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;

const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers([
  "1.1.1.1",
  "8.8.8.8",
]);

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;