// // controllers/message.controller.js
// import MessageModel from "../../model/message/index.js";
// import ConversationModel from "../../model/conversation/index.js";
// import UserModel from "../../model/user/index.js";
// import { getReceiverSocketId, io } from "../../socket/index.js";

// const MessageController = {
//   sendMessage: async (req, res) => {
//     try {
//       const { message } = req.body;
//       const { id: receiverId } = req.params;
//       const senderId = req.user.id;

//       let conversation = await ConversationModel.findOne({
//         include: [
//           {
//             model: UserModel,
//             as: "participants",
//             where: { id: [senderId, receiverId] },
//           },
//         ],
//       });

//       if (!conversation) {
//         conversation = await ConversationModel.create({});
//         await conversation.addParticipants([senderId, receiverId]);
//       }

//       const newMessage = await MessageModel.create({
//         senderId,
//         receiverId,
//         message,
//         ConversationId: conversation.id,
//       });

//       const receiverSocketId = getReceiverSocketId(receiverId);
//       if (receiverSocketId) {
//         io.to(receiverSocketId).emit("newMessage", newMessage);
//       }

//       res.status(201).json(newMessage);
//     } catch (error) {
//       console.error("Error in sendMessage controller: ", error);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   },

//   getMessage: async (req, res) => {
//     try {
//       const { id: receiverId } = req.params;
//       const senderId = req.user.id;

//       // Check if a conversation exists between the sender and receiver
//       const conversation = await ConversationModel.findOne({
//         include: [
//           {
//             model: UserModel,
//             as: "participants",
//             where: { id: [senderId, receiverId] },
//           },
//           { model: MessageModel, as: "messages" },
//         ],
//       });

//       if (!conversation) {
//         // If no conversation exists, return an empty array
//         return res.status(200).json([]);
//       }

//       const messages = conversation.messages;
//       res.status(200).json(messages);
//     } catch (error) {
//       console.error("Error in getMessage controller: ", error);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   },
// };

// export default MessageController;
