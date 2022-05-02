const PurchasedModel = require('../purchased/purchased.model');
const eventCreateMessage = require('./chat.events');

const patchChat = async (body) => {
  try {
    const { sellerId, buyerId, userName, message} = body;
    const chatObj = {
      $or: [{
        sellerId: { $regex: sellerId, $options: 'i' }
      }],
      $and: [{
        Buyerid: { $regex: buyerId, $options: 'i' }
      }]
    }
    if (chatObj) {
      const dataPushed = chatObj.chat;
      dataPushed.push({userName,message});
      const message = await PurchasedModel.findByIdAndUpdate(chatObj._id, {chat: dataPushed}, {new: true});
      return eventCreateMessage(message.chat);
    }
  } catch (error) {
      throw error;
  }
}

module.exports = {
  patchChat,
}
