const cloudinary = require('cloudinary').v2
const DatauriParser = require('datauri/parser');
const parser = new DatauriParser();
const path = require('path');
cloudinary.config({ 
        cloud_name: 'hkfzp0y8', 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
});
exports.uploadToCloud = async(buffer,originalname)=>{
    // Convert buffer into a string that looks like "data:image/jpeg;base64,..."
const fileExtension = path.extname(originalname).toString();
const file64 = parser.format(fileExtension,buffer);

// Upload the base64 string directly
const result = await cloudinary.uploader.upload(file64.content);
return result
}