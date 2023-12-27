const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const nodemailer = require("nodemailer");
const JWT_SECRET_KEY = "mihir#blogapp";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "cmihir044@gmail.com",
    pass: "qgyqybnrkxjnehla",
  },
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.json({
      message: "Registered Successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Username/Password",
      });
    }
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET_KEY,
    );
    res.json({
      token,
      user,
      message: "Login Successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.post("/sendotp", async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);
  try {
    const mailoption = {
      from: "cmihir044@gmail.com",
      to: email,
      subject: "Otp for login",
      text: `your otp for login is ${otp}`,
    };

    transporter.sendMail(mailoption, async (err, info) => {
      if (err) {
        res.status(500).json({
          message: err.message,
        });
      } else {
        const user = await User.findOne({ email });
        if (!user) {
          res.status(400).json({
            message: "User not found",
          });
        }
        user.otp = otp;
        await user.save();

        res.json({
          message: "OTP sent successfully",
        });
      }
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;
