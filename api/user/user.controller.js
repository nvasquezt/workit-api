const crypto = require('crypto');
const fs = require('fs');

const cloudinary = require('cloudinary').v2;
const {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  patchUser
} = require("./user.service");

const { sendMailSendGrid } = require("../../utils/email");

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

const handlerAllUsers = async (req, res) => {
  try{
    const users = await getAllUsers();
    if (!users) {
      res.status(404).json({message: "Users not found"});
    } else {
      res.status(200).json(users);
    }
  } catch(error) {
    res.status(500).json({message: "Internal server error ref h->AllUsers"});
  }
}

const handlerUserById = async (req, res) => {
  try{
    const { id } = req.params;
    const user = await getUserById(id);
    if (!user) {
      res.status(404).json({message: `User not found`});
    } else {
      res.status(200).json(user);
    }
  } catch(error) {
    res.status(500).json({message: "Internal server error ref h->UserById"});
  }
}

const handlerCreateUser = async (req, res) => {
  try{
    const { body } = req;
    const { file } = req; 
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
      req.body.imageprofile=imagen;
    }
    const { name, last, username, password, email,} = body;
    if (!name || !last || !username || !password || !email) {
      res.status(400).json({message: "Bad request"});
    }
    const hash = crypto.createHash('sha256')
    .update(email)
    .digest('hex');
    passwordResetToken = hash;
    passwordResetExpires = Date.now() + (3600000 * 24);
    req.body.passwordResetExpires = passwordResetExpires;
    req.body.passwordResetToken = passwordResetToken;
    const user = await createUser(req.body);
    const sendemail = {
      from: 'noreply <noreply.workitapp@gmail.com>',
      to: user.email,
      template_id: "d-83fd1a58be5f4964b47edf9369e37718",
      dynamic_template_data: {
          "subject": "Activate your account on WorkItApp",
          "name": user.name,
          "last": user.last,
          "url": `https://work-it.vercel.app/activate/${hash}`,
          },
    };

    await sendMailSendGrid(sendemail);

    res.status(201).json(user);
  } catch(error) {
    res.status(500).json({message: "Internal server error ref h->CreateUser"});
  }
}

const handlerDeleteUser = async (req,res) => {
  try{
    const { id } = req.params;
    const user = await deleteUser(id);
    if (!user) {
      res.status(404).json({message: "User not found"})
    } else {
      res.json({message: `User deleted`});
    }
  } catch(error) {
    res.status(500).json({message: "Internal server error ref h->DeleteUser"});
  }
}

const handlerUpdateUser = async (req, res) => {
  const { id } = req.params;
  const { file } = req;  
  try{
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
      req.body.imageprofile=imagen;
    }
      const user = await patchUser(id, req.body);
      if (!user) {
        res.status(404).json({message: "User not found" })
      } else {
        res.json({message: `User updated`});
      }
    }
    catch{
      console.log("error");
    }
    
}


module.exports = {
  handlerAllUsers,
  handlerUserById,
  handlerCreateUser,
  handlerDeleteUser,
  handlerUpdateUser
}
