
const mongoose=require('mongoose')

const blogschema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    blogphoto: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    category: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true,
        minlength: [200, '200 words only']
    },
    adminName: {
        type: String,
        required: true
    },
    UserPhoto: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    }
}, { timestamps: true });

const blogmodel = mongoose.model('BLogModel', blogschema);
module.exports = blogmodel;
