import { ErrorResponse } from "../utils/Error.js";
import { User } from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginController = async (req, res, next) => {
  let err, userExist, savedUser, passwordCheck;
  debugger;
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      err = new Error("Please fill all fields!");
      err.statusCode = 400;
      err.ok = false;
      throw err;
    }

    userExist = await User.findOne({ username: username });
    if (!userExist) {
      err = new Error("User does not exist with given username.");
      err.statusCode = 400;
      err.ok = false;
      throw err;
    }

    passwordCheck = bcrypt.compare(password, userExist.password);
    if (!passwordCheck) {
      err = new Error("Invalid Password!");
      err.statusCode = 400;
      err.ok = false;
      throw err;
    }

    let token = jwt.sign({ id: userExist._id }, "kawasaki", {
      expiresIn: "1h",
    });

    res.status(201).json({
      message: "Successfully logged in user",
      ok: true,
      token: token,
      user: userExist,
    });
  } catch (error) {
    next(error);
  }
};

const signInController = async (req, res, next) => {
  let err, userNameExist, salt, hashedPass, user, savedUser;
  debugger;
  const { fullName, username, password } = req.body;

  try {
    if (!fullName || !username || !password) {
      err = new Error("Please fill all fields!");
      err.statusCode = 400;
      err.ok = false;
      throw err;
    }

    userNameExist = await User.findOne({ username: username });
    if (userNameExist) {
      err = new Error("User already exist with given username.");
      err.statusCode = 400;
      err.ok = false;
      throw err;
    }

    salt = await bcrypt.genSalt(10);
    hashedPass = await bcrypt.hash(password, salt);

    user = await new User({
      name: fullName,
      username: username,
      password: hashedPass,
    });

    savedUser = await user.save();
    if (!savedUser) {
      err = new Error("Cannot create user! Please try again in sometime");
      err.statusCode = 400;
      err.ok = false;
      throw err;
    }

    res.status(201).json({
      message: "Successfully Signed in user",
      ok: true,
      user: savedUser,
    });
  } catch (error) {
    next(error);
  }
};

export { loginController, signInController };
