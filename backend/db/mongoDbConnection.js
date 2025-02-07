const mongoose = require("mongoose");

const DbConnect = async () => {
  try {
    const connnection = await mongoose.connect(process.env.MONGO_URI);
    //web bata cluster banau ne
    console.log("MongoDb Connected");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
module.exports = DbConnect;
