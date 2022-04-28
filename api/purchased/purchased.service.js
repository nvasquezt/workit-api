const PurchasedModel = require('./purchased.model');

const getAllPurchased = async () => {
  try{
    return await PurchasedModel.find();
  } catch (error) {
    throw error;
  }
}

const getPurchasedById = async (id) => {
  try{
    const purchasedService = await PurchasedModel.findById(id);
    if(!purchasedService){
      return null
    }
    return purchasedService;
  } catch (error) {
    throw error;
  }
}

const getCreatePurchased = async (body) => {
  try{
    return await PurchasedModel.create(body);
  } catch (error) {
    throw error;
  }
}

const getUpdatePurchased = async (id, body) => {
  try{
    return await PurchasedModel.findByIdAndUpdate(id, body, {new: true});
  } catch (error) {
    throw error;
  }
}

const getDeletePurchased = async (id) => {
  try{
    return await PurchasedModel.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
}

const getPurchasedByQuery = async (query) => {
  try {
    const queryObj = {
      $or: [{
        sellerId: { $regex: query, $options: 'i' },
        buyerId: { $regex: query, $options: 'i' },
      }],
    };
    return await PurchasedModel.find(queryObj);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllPurchased,
  getPurchasedById,
  getCreatePurchased,
  getUpdatePurchased,
  getDeletePurchased,
  getPurchasedByQuery
}
