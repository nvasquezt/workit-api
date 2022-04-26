const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
    title:{
        type: String,
        trim: true,
        require: true
    },
    tags: {
        type: Object,
        trim: true,
        require: true
    },
    username: {
        type: String,
        ref: 'User'
    },
    userId: {
        type: String,
        require: true
    },
    cost: {
        type: Number,
        trim: true,
        require: true
    },
    costType: {
        type: String,
        trim: true,
        require: false
    },
    description: {
        type: String,
        trim: true,
        require: true
    },
    image: {
        type: String,
        default: 'https://res.cloudinary.com/dbsumvu1d/image/upload/v1650855803/Imagen-destacada-post-VN-1_ssfest.png',
        require: false
    },
    rank: {
        type: Number,
        trim: true,
        require: false
    },
},
{
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Service', ServiceSchema);
