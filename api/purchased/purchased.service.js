const PurchasedModel = require('./purchased.model');
const UserModel = require('../user/user.model');
const ServiceModel = require('../service/service.model');
const { populate } = require('./purchased.model');

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

const getPurchasedByBuyerId = async (query) => {
  try {
    const queryObj = {
      $or: [{
        buyerId: { $regex: query, $options: 'i' }
      }],
      $and: [{
        status: { $regex: 'approved' }
      }]
    };
    console.log(queryObj, 'queryObj');
    console.log(query, 'query');
    if (queryObj){
      const dataPushed = [];
      const alldata = await PurchasedModel.find(queryObj);
      for (let i = 0; i < alldata.length; i++) {
        dataPushed.push(
          await UserModel.findById(alldata[i].buyerId),
          await ServiceModel.findById(alldata[i].serviceId)
        );
      }
      return dataPushed;
    } else {
      return null;
    }

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
  getPurchasedByBuyerId
}
