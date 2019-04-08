import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    posts: [{
      type: Schema.Types.ObjectId, // el tipo de dato referido post es de tipo Schema
      ref: "Post"
    }]
  },
  {
    timestamps: true
  }
);
export default model("User", UserSchema);
