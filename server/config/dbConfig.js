const mongoose = require("mongoose");

if (!process.env.MONGO_URL) {
  console.error("MONGO_URL is not set. Check your environment variables.");
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URL);

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Mongo Db Connection Successful");
});

connection.on("error", (err) => {
  console.log("Mongo Db Connection Failed");
});

module.exports = connection;
