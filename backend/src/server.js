const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config");

const server = async () => {
  try {
    await mongoose.connect(config.database_url);
    app.listen(config.port, () => {
      console.log(`Server is Running: http://localhost:${config.port}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};
server();
