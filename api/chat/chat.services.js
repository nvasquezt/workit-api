const PurchasedModel = require('../purchased/purchased.model');
const eventCreateMessage = require('./chat.events');

const patchChat = async (body) => {
  try {
    const { sellerId, buyerId, userName, message } = body;
    const chatObj = {
      $or: [{
        sellerId: { $regex: sellerId, $options: 'i' }
      }],
      $and: [{
        Buyerid: { $regex: buyerId, $options: 'i' }
      }]
    }
    console.log(chatObj);
    if (chatObj) {
      const dataPushed = chatObj.chat;
      dataPushed.push(message, userName);
      const chat = await PurchasedModel.findByIdAndUpdate(chatObj._id, {chat: dataPushed}, {new: true});
      return eventCreateMessage(chat.chat);
    }
  } catch (error) {
      throw error;
  }
}

module.exports = {
  patchChat,
}
