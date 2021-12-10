import mongoose from "mongoose";

const CommentModel = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "PostModel" },
  body: { type: String, required: true },
});

export default mongoose.model("CommentModel", CommentModel);
