const User = require("../model/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

// ✅ SIGNUP CONTROLLER
module.exports.Signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // User exists check
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    // ✅ Password hash karo
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Naya user banao
    const user = await User.create({
      email,
      password: hashedPassword,
      username,
    });

    // ✅ Token banao
    const token = createSecretToken(user._id);

    // ✅ Cookie set karo
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: true, // security ke liye true karo!
    });

    res.status(201).json({
      success: true,
      message: "User signed up successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Signup failed!" });
  }
};

// ✅ LOGIN CONTROLLER
module.exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Incorrect email or password" });
    }

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ success: false, message: "Incorrect email or password" });
    }

    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: true, // security ke liye
    });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Login failed!" });
  }
};
