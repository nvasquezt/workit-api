const {
  patchChat,
}= require('./chat.services');

const handlerPostChat = async (req, res) => {
  try {
    const chat = await patchChat(req.body);
    if(!chat){
      res.status(404).json({message: "Chat not created"});
    }
    else {
      res.json(chat)
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
  handlerPostChat,
}
