const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    last: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    imageprofile: {
        type: String,
        default: 'https://res.cloudinary.com/dbsumvu1d/image/upload/v1650842845/WhatsApp_Image_2022-04-24_at_6.23.41_PM_zntu1s.jpg'
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        default: 'user'
    },
    offeredServices:{
        type: [String],
        default: []
    },
    purchasedServices:{
        type: [String],
        default: []
    },
    passwordResetToken: {
        type: String,
        default: null
    },
    passwordResetExpires: {
        type: Date,
        default: null
    },
    active: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
});

UserSchema.pre('save', async function (next) {
    const user = this;
    try {
        if (!user.isModified('password')) {
            return next();
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
        return next();
    } catch (err) {
        return next(err);
    }
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
    const user = this;
    try {
        const isMatch = await bcrypt.compare(candidatePassword, user.password);
        return isMatch;
    }
    catch (err) {
        throw new Error(err);
    }
};

UserSchema.virtual('profile').get(function () {
    const { name, last, username, email} = this;
    return {
        fullname: `${name} ${last}`,
        username,
        email
    };
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
