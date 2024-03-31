const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config");

const port = config.port || 3000;
const server = async () => {
  try {
    await mongoose.connect(config.database_url);
    app.listen(port, () => {
      console.log(`Server is Running: http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};
server();
