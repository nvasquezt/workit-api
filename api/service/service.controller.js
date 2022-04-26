const fs = require('fs');

const cloudinary = require('cloudinary').v2;

const {
    getAllServices,
    getServiceById,
    createService,
    deleteService,
    patchService
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
    const { id } = req.params;
    const service = await getServiceById(id);
    if(!service){
        res.status(404).json({message: "Service not found"});
    } else {
        res.json(service)
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
    const { id } = req.params;
    const { body } = req;
    const service = await patchService(id, body);
    if(!service){
        res.status(404).json({message: "Service not found"});
    } else{
        res.json({message: "Service updated"});
    }
}

module.exports = {
    handlerAllServices,
    handlerServiceById,
    handlerCreateService,
    handlerDeleteService,
    handlerUpdateService
  }
