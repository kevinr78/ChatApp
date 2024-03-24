import mongoose from "mongoose";

let DBConnect = function () {
  mongoose
    .connect(process.env.MONGO_URL)
    .then((response) => {
      console.log("DB Connected");
    })
    .catch((err) => {
      console.log("err");
    });
};

export default DBConnect;
