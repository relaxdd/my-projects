import mongoose from "mongoose";

/* Заметки: 
 TODO | Можно вынести саму связь в отдельную таблицу 
 что бы не дублировать значения и обращатся 
 к ней по id связи которую мы сохраняем у себя и друга
*/
const FriendsModel = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
    required: true,
  },
  friendsList: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
        require: true,
        index: true,
        unique: true,
        sparse: true,
      },
      typeRelation: {
        type: String,
        enum: ["isFriends", "ISubscribed", "subscribedToMe"],
        required: true,
      },
    },
  ],
});

export default mongoose.model("friends", FriendsModel);
