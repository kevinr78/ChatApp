import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.returnUsername = function (id) {
  return mongoose.model("User").findById(id).select("firstName lastName");
};

// return fullName of user
/* userSchema.statics.getFullName = function(id){
    return this.fin
} */
const model = mongoose.model("User", userSchema);
export { model as User };
