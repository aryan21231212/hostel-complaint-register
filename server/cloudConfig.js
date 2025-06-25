const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: "dguioetje",
    api_key: 218963115353287,
    api_secret: '9G61hZXsSW8Y3NL0JTPscJo0n5E'
})


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'wanderlust',
      allowedFormats: ['png','jpg','jpeg'],
    },
  });


  module.exports = {
    cloudinary,
    storage,
  }