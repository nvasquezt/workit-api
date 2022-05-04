const ServiceModel = require('./service.model');

const getAllServices = async () => {
    return await ServiceModel.find();
}

const getServiceById = async (id) => {
    const service = await ServiceModel.findById(id);
    if(!service){
        return null
    }
    return service;
}

const createService = async (service) => {
    return await ServiceModel.create(service);
}

const deleteService = async (id) => {
    const service = await ServiceModel.findById(id);
    if(!service){
        return null
    }
    return await ServiceModel.findByIdAndDelete(id);
}

const patchService = async (id, service) => {
    const serviceToUpdate = await ServiceModel.findById(id);
    if(!serviceToUpdate){
        return null
    }
    return await ServiceModel.findByIdAndUpdate(id, service);
}

const getServiceByquery = async (query) => {
try {
  const queryObj = {
    $or: [
      { title: { $regex: query, $options: 'i' } },
      { description: { $regex: query, $options: 'i' } },
      { tags: { $regex: query, $options: 'i' } },
      { username: { $regex: query, $options: 'i' } }
    ],
  };
  return await ServiceModel.find(queryObj);
} catch (error) {
  console.log(error);
  return null;
}}


module.exports = {
    getAllServices,
    getServiceById,
    createService,
    deleteService,
    patchService,
    getServiceByquery
}
