import "dotenv/config";
import UserModel from "../../model/user/index.js";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import MentorModel from "../../model/mentor/index.js";
import SeekerModel from "../../model/seeker/index.js";
import path from "path";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import sequelize from "../../db/config.js";

import getCoordsForAddress from "../../utils/location.js";

const AuthController = {
  register: async (req, res) => {
    try {
      const { name, email, password, role, phone, address, about } = req.body;
      const profilePicture = req.file ? req.file.path : null;
      let locationCoordinates;
      try {
        locationCoordinates = await getCoordsForAddress(address);
      } catch (err) {
        return next(err);
      }
      const user = await UserModel.findOne({ where: { email } });
      if (user) {
        return res.json({ message: "This email already exist!" });
      }
      // if (password !== confirm_password) {
      //   return res.json({ message: "Password did not match!" });
      // }
      const hpassword = await bcrypt.hash(password, 10);
      await UserModel.create({
        name,
        email,
        password: hpassword,
        role,
        phone,
        address,
        profilePicture,
        location: {
          type: "Point",
          coordinates: [locationCoordinates.lng, locationCoordinates.lat],
        },

        about,
      });

      const fullUrl =
        req.protocol +
        "://" +
        req.get("host") +
        "/" +
        profilePicture.replace(/\\/g, "/");
      const createdUser = await UserModel.findOne({ where: { email } });
      if (createdUser.role === "mentor") {
        await MentorModel.create({ UserId: createdUser.id });
        console.log(name, email, hpassword, role, phone, address);
        return res.json({ message: "User Created", fullUrl });
      }
      await SeekerModel.create({ UserId: createdUser.id });
      console.log(name, email, hpassword, role, phone, address);
      return res.json({ message: "User Created", fullUrl });
    } catch (error) {
      return res.status(400).json({ message: "Server Error", error });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: "Invalid Credentials!" });
      }
      const hashingResponse = await bcrypt.compare(password, user.password);
      if (!hashingResponse) {
        return res.status(401).json({ message: "Invalid Credentials!" });
      }
      const id = user.id;
      const role = user.role;
      const token = Jwt.sign(
        { email, password, id, role },
        process.env.JWT_SIGNATURE
      );
      if (token.error) {
        return res.json({ error: response.error });
      }

      return res.json({ message: "Login Sucessfull!!!", token });
    } catch (error) {
      return res.status(400).json({ message: "Server Error", error });
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await UserModel.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: "Invalid Email!" });
      }
      const id = user.id;
      const token = Jwt.sign({ email }, process.env.JWT_SIGNATURE);
      var transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "97b0bd0ecf1723",
          pass: "38a18f1de168e3",
        },
      });
      // const transporter = nodemailer.createTransport({
      //   service: "gmail",
      //   auth: { user: "random89571@gmail.com", pass: "8957avd8?" },
      // });
      const mailOptions = {
        from: "random89571@gmail.com",
        to: email,
        subject: "Reset Password",
        html: `<h1>Reset Your Password</h1>
      <p>Click on the following link to reset your password:</p>
      <a href="http://localhost:3333/reset-password/${token}">http://localhost:3333/reset-password/${token}</a>
      <p>The link will expire in 10 minutes.</p>
      <p>If you didn't request a password reset, please ignore this email.</p>`,
      };
      console.log(
        "Yhn tk hua hai snd nai hui!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
      );

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          return res.status(500).send({ message: err.message });
        }
        res.status(200).send({ message: "Email sent" });
      });
    } catch (error) {
      return res.status(400).json({ message: "Server Error", error });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const decodedToken = Jwt.verify(
        req.params.token,
        process.env.JWT_SIGNATURE
      );

      console.log(req.params.token);

      if (!decodedToken) {
        return res.status(401).send({ message: "Invalid token" });
      }

      const user = await UserModel.findOne({
        where: { email: decodedToken.email },
      });
      if (!user) {
        return res.status(401).send({ message: "no user found" });
      }

      const salt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash(req.body.newPassword, salt);

      user.password = newPassword;
      await user.save();

      return res.status(200).send({ message: "Password updated" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
  getProfilePicture: (req, res) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const fileName = req.params.filename;
    const filePath = path.join(__dirname, "../../../uploads", fileName);
    res.sendFile(filePath);
  },

  nearestMentor: async (req, res, next) => {
    try {
      const { seekerLatitude, seekerLongitude } = req.body;

      const nearMentors = await UserModel.findAll({
        where: { role: "mentor" },
        attributes: ["id", "name", "address", "profilePicture", "role"],
        order: [
          sequelize.literal(
            `ST_Distance(location, ST_MakePoint(${seekerLongitude}, ${seekerLatitude}))`
          ),
        ],
        limit: 10,
      });
      const profileUrls = [];
      for (let i = 0; i < nearMentors.length; i++) {
        const fullUrl =
          req.protocol +
          "://" +
          req.get("host") +
          "/" +
          nearMentors[i].profilePicture.replace(/\\/g, "/");
        profileUrls.push(fullUrl);
      }
      console.log(profileUrls);

      res.status(200).json({ nearMentors, profileUrls });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
};
export default AuthController;
