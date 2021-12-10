import mongoose from "mongoose";

const PostModel = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
  date: { type: String, required: true },
  body: { type: String, required: true },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  fixed: { type: Boolean, default: false },
  whoLiked: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
        require: true,
      },
    },
  ],
});

export default mongoose.model("posts", PostModel);
