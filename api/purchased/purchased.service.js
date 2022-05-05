const PurchasedModel = require('./purchased.model');
const UserModel = require('../user/user.model');
const ServiceModel = require('../service/service.model');

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
        sellerId: { $regex: query, $options: 'i' }
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
        const purchasedId = alldata[i]._id;
        const buyerId = alldata[i].buyerId;
        const userdata = await UserModel.findById(alldata[i].buyerId);
        const servicedata = await ServiceModel.findById(alldata[i].serviceId)
        const { name, last, username,imageprofile }  = userdata;
        const {title, _id} = servicedata;
        dataPushed.push({
          'purchasedId': purchasedId,
          'buyerId': buyerId,
          name,
          last,
          username,
          title,
          imageprofile,
          'serviceId': _id
        });
      }

      return dataPushed;
    } else {
      return null;
    }

  } catch (error) {
    throw error;
  }
}

const getPurchasedBySellerId = async (bought) => {
  try {
    const queryObj = {
      $or: [{
        buyerId: { $regex: bought, $options: 'i' }
      }],
      $and: [{
        status: { $regex: 'approved' }
      }]
    };
    if (queryObj){
      const dataPushed = [];
      const alldata = await PurchasedModel.find(queryObj);

      for (let i = 0; i < alldata.length; i++) {
        const purchasedId = alldata[i]._id;
        const sellerId = alldata[i].sellerId;
        const date = alldata[i].date;
        const userdata = await UserModel.findById(alldata[i].sellerId);
        const servicedata = await ServiceModel.findById(alldata[i].serviceId)
        const { name, last, username,imageprofile }  = userdata;
        const {title} = servicedata;
        dataPushed.push({
          'purchasedId': purchasedId,
          'sellerId': sellerId,
          date,
          name,
          last,
          username,
          title,
          imageprofile
        });
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
  getPurchasedByBuyerId,
  getPurchasedBySellerId
}
