const {
  getAllPurchased,
  getPurchasedById,
  getCreatePurchased,
  getUpdatePurchased,
  getDeletePurchased,
  getPurchasedByBuyerId,
  getPurchasedBySellerId
} = require ('./purchased.service');

const handlerAllPurchased = async (req, res) => {
  try{
    const purchasedService = await getAllPurchased();
    if(!purchasedService){
      res.status(404).json({message: "Transaction not found"});
    }
    else{
      res.json(purchasedService)
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

const handlerPurchasedById = async (req, res) => {
  try{
    const { id } = req.params;
    const purchasedService = await getPurchasedById(id);
    if(!purchasedService){
      res.status(404).json({message: "Transaction not found"});
    }
    else{
      res.json(purchasedService)
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

const handlerCreatePurchased = async (req, res) => {
  try {
    const { body } = req;
    const purchasedService = await getCreatePurchased(body);
    if(!purchasedService){
      res.status(404).json({message: "Transaction not created"});
    }
    else {
      res.json(purchasedService)
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

const handlerUpdatePurchased = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const purchasedService = await getUpdatePurchased(id, body);
    if(!purchasedService){
      res.status(404).json({message: "Transaction not updated"});
    }
    else {
      res.json(purchasedService)
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

const handlerDeletePurchased = async (req, res) => {
  try {
    const { id } = req.params;
    const purchasedService = await getDeletePurchased(id);
    if(!purchasedService){
      res.status(404).json({message: "Transaction not deleted"});
    }
    else {
      res.json(purchasedService)
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

const handlerPurchasedByQuery = async (req, res) => {
  try {
    const { query } = req.params;
    const purchasedService = await getPurchasedByBuyerId(query);
    if(!purchasedService){
      res.status(404).json({message: "Transaction not found"});
    }
    else {
      res.json(purchasedService)
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

const handlerPurchasedByBought = async (req, res) => {
  try {
    const { bought } = req.params;
    const purchasedService = await getPurchasedBySellerId(bought);
    if(!purchasedService){
      res.status(404).json({message: "Transaction not found"});
    }
    else {
      res.json(purchasedService)
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
  handlerAllPurchased,
  handlerPurchasedById,
  handlerCreatePurchased,
  handlerUpdatePurchased,
  handlerDeletePurchased,
  handlerPurchasedByQuery,
  handlerPurchasedByBought
}
