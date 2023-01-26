import { set, connect } from "mongoose";

const connectDB = (url) => {
  set("strictQuery", true);

  connect(url)
    .then(() => console.log("connected to mongo"))
    .catch((err) => {
      console.error("failed to connect with mongo");
      console.error({ err });
    });
};

export default connectDB;
