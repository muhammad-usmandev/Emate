import SeekerModel from "../../model/seeker/index.js";
import UserModel from "../../model/user/index.js";
import ConnectionModel from "../../model/connection/index.js";
import { Op } from "sequelize";

const SeekerController = {
  showProfile: async (req, res) => {
    try {
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      console.log(req.user.id);
      const data = await UserModel.findOne({
        where: { id: req.user.id },
        attributes: [
          "name",
          "email",
          "phone",
          "address",
          "profilePicture",
          "about",
        ],
        include: [
          {
            model: SeekerModel,
            attributes: ["education"],
          },
        ],
        // this raw line makes the whole nested object a single object
        //raw: true,
      });
      // console.log(data);
      if (!data) {
        return res.json({
          message:
            "User Not Found or token has been expired!!!!!!!!!!!!!!!!!!!!!!!!!",
        });
      }
      return res.json({ data });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Server Error", error });
    }
  },

  // showConnection: async (req, res) => {
  //   try {
  //     const connections = await ConnectionModel.findAll({
  //       where: { seekerId: req.user.id, status: "accepted" },
  //       include: [
  //         { model: UserModel, as: "seeker" },
  //         { model: UserModel, as: "mentor" },
  //       ],
  //     });
  //     return res.json({ message: "Got All Connections!!", connections });
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(400).json({ message: "Server Error", error });
  //   }
  // },

  showConnections: async (req, res) => {
    try {
      const seekerConnections = await ConnectionModel.findAll({
        where: {
          [Op.or]: [{ senderId: req.user.id }, { receiverId: req.user.id }],
          status: "accepted",
        },
        include: [
          {
            model: UserModel,
            as: "sender",
            attributes: [
              "name",
              "email",
              "phone",
              "address",
              "profilePicture",
              "role",
            ],
          },
          {
            model: UserModel,
            as: "receiver",
            attributes: [
              "name",
              "email",
              "phone",
              "address",
              "profilePicture",
              "role",
            ],
          },
        ],
      });

      const connectionDetails = seekerConnections.map((connection) => {
        const otherUser =
          connection.senderId === req.user.id
            ? connection.receiver
            : connection.sender;
        return {
          id: connection.id,
          status: connection.status,
          otherUser: {
            id: otherUser.id,
            name: otherUser.name,
            email: otherUser.email,
            phone: otherUser.phone,
            address: otherUser.address,
            profilePicture: otherUser.profilePicture,
            role: otherUser.role,
          },
        };
      });

      return res.json({
        message: "Seeker's Connections",
        connections: connectionDetails,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Server Error", error });
    }
  },
  editProfile: async (req, res) => {
    try {
      const { name, address, phone, profilePicture, about, education } =
        req.body;
      const user = await UserModel.findOne({ where: { id: req.user.id } });
      const userInfo = await SeekerModel.findOne({
        where: { UserId: req.user.id },
      });
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      console.log(userInfo);
      if (!user) {
        return res.status(404).json({
          message: "User Issue!!!!!!!!!!!!!!!!!!!!!!!!!",
        });
      }
      if (!userInfo) {
        return res.status(404).json({
          message: "User Info issue!!!!!!!!!!!!!!!!!!!!!!!!!",
        });
      }

      if (name) user.name = name;
      if (address) user.address = address;
      if (phone) user.phone = phone;
      if (profilePicture) user.profilePicture = profilePicture;
      if (about) user.about = about;
      if (userInfo) userInfo.education = education;
      await user.save();
      await userInfo.save();
      res.json({
        message: "Profile got Updated",
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Server Error", error });
    }
  },
};
export default SeekerController;
