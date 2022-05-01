const fs = require('fs');
const cloudinary = require('cloudinary').v2;

const {
    getAllServices,
    getServiceById,
    createService,
    deleteService,
    patchService,
    getServiceByquery
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
  console.log(req.body);
    try {
        const { body } = req;
        const tags = body.tags.split(",");
        body.tags = tags;
        const service = await createService(body);
        if (!service) {
          return res.status(404).json({
            message: 'Internal server error'
          });
        }else{
          res.status(201).json({message: "Service created" , service});
        }
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
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
  try{
    const { id } = req.params;
    const { file } = req;
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
    req.body.image = imagen;
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
    console.log(query, "query que recibo");
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

module.exports = {
    handlerAllServices,
    handlerServiceById,
    handlerCreateService,
    handlerDeleteService,
    handlerUpdateService,
    handlerSearchServiceById
  }
