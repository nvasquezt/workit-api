const fs = require('fs');
const cloudinary = require('cloudinary').v2;

const {
    getAllServices,
    getServiceById,
    createService,
    deleteService,
    patchService,
    getServiceByquery,
    getServiceBySellerId,
    getServiceBytag
} = require("./service.service");


async function uploadImage(image) {
  try {
    const result = await cloudinary.uploader.upload(image);
    return result;
  } catch (error) {
    console.log(error);
  } finally{
    fs.unlinkSync(image);
  }
}
const handlerAllServices = async (req, res) => {
    const services = await getAllServices();
    if(!services){
        res.status(404).json({message: "Services not found"});
    }
    else{
        res.json(services)
    }
}

const handlerServiceById = async (req, res) => {
  try{
    const { id } = req.params;
    const service = await getServiceById(id);
    if(!service){
      res.status(404).json({message: "Service not found"});
    }
    else{
      res.json(service)
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

const handlerCreateService = async (req, res) => {

  const { file } = req;
  try {
    if(file){
      try {
        const size = file.size / 1024 / 1024;
        if (size > 5) {
          return res.status(400).json({
            message: 'Image size should be less than 5MB'
          });
        }
      } catch (error) {
        res.status(500).json(error);
      }
      const result  = await uploadImage(file.path);
      const imagen = result.url;
      req.body.image=imagen;
    }
    const tags = req.body.tags.split(",");
    req.body.tags = tags;
    const service = await createService(req.body);
    if (!service) {
      res.status(404).json({message: "Service not found" })
    } else {
      res.json({message: `Service updated`});
    }
  }
  catch{
    console.log("error");
  }
}

const handlerDeleteService = async (req, res) => {
    const { id } = req.params;
    const service = await deleteService(id);
    if(!service){
        res.status(404).json({message: "Service not found"});
    } else{
        res.json({message: "Service deleted"});
    }
}

const handlerUpdateService = async (req, res) => {
    const { id } = req.params;
    const { file } = req;
  try {
    if(file){
      try {
        const size = file.size / 1024 / 1024;
        if (size > 5) {
          return res.status(400).json({
            message: 'Image size should be less than 5MB'
          });
        }
      } catch (error) {
        res.status(500).json(error);
      }
      const result  = await uploadImage(file.path);
      const imagen = result.url;
      req.body.image=imagen;
    }
    const service = await patchService(id, req.body);
    if (!service) {
      res.status(404).json({message: "Service not found" })
    } else {
      res.json({message: `Service updated`});
    }
  }
  catch{
    console.log("error");
  }
}

const handlerSearchServiceById = async (req, res) => {
  try {
    const { query } = req.params;
    const services = await getServiceByquery(query);
    if (!services) {
      return res.status(404).json({
        message: 'Query not found'
      });
    }
    res.json(services);
  } catch (error) {
    res.status(500).json(error);
  }
}

const handlerSearchServiceByTitle = async (req, res) => {
  try {
    const { query } = req.params;
    const services = await getServiceByquery(query);
    if (!services) {
      return res.status(404).json({
        message: 'Title not found'
      });
    } else {
      res.json(services);
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

const handlerSearchServiceBytag = async (req, res) => {
  try {
    const { tag } = req.params;
    const services = await getServiceBytag(tag);
    if (!services) {
      return res.status(404).json({
        message: 'Tag not found'
      });
    } else {
      res.json(services);
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

const handlerSearchServiceBySellerId = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const services = await getServiceBySellerId(sellerId);
    if (!services) {
      return res.status(404).json({
        message: 'Services not found'
      });
    }
    res.json(services);
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
    handlerAllServices,
    handlerServiceById,
    handlerCreateService,
    handlerDeleteService,
    handlerUpdateService,
    handlerSearchServiceById,
    handlerSearchServiceByTitle,
    handlerSearchServiceBytag,
    handlerSearchServiceBySellerId,
  }
