const PurchasedModel = require('../purchased/purchased.model');
const {eventCreateMessage, eventReceivedMessage } = require('./chat.events');

const patchChat = async (req) => {
  console.log('body', req.body)
  console.log('Params', req.params)
  const { id } = req.params;
  try {
    const chat = await PurchasedModel.findByIdAndUpdate(id, {$push:{chat: req.body}}, {new: true});
    eventCreateMessage(chat.chat);
    eventReceivedMessage(id);
    return chat;
  } catch (error) {
    console.log(error);
      throw error;
  }
}
module.exports = {
  patchChat,
}
