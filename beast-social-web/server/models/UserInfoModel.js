import mongoose from "mongoose";

const UserInfoModel = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
  avatar: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  gender: {
    type: String,
    enum: ["male", "female", "none"],
  },
  phone: { type: String },
  dateBirth: { type: String },
  city: { type: String },
});

export default mongoose.model("users-info", UserInfoModel);
