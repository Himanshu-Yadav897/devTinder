const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://hy897433:rC8scRgINjnglVzo@namastenode.pcmk8vt.mongodb.net/devTinder"
  );
};

module.exports = connectDB;

