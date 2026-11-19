//this file is only for server creation
const express = require('express');
const noteModel = require('./models/note.model');
const postModel = require('./models/post.model')
const mongoose  = require('mongoose');
const cors = require('cors')
const { imageKit, uploadToCloud } = require('./services/cloud.service');

const multer = require('multer')
const app = express()

//app.use means run this middleware for all requests
app.use(express.json()); //to convert raw data in readable form
//multer is for converting multipart data that's why it is called multer
app.use(cors())
const multiPartDataReader = multer({storage:multer.memoryStorage()});//stores file data in ram
// const multiPartDataReader = multer({dest:"uploads/"}); => stores in disk (shortcut)
// const multiPartDataReader = multer({storage:multer.diskStorage({
//     filename,filesize,destination
// })}); => stores in disk (more configuration)

app.post('/create-post',multiPartDataReader.single('image'),async(req,res)=>{
    // here multer uploads the file in req.file object
    // and saves textual key value data in req.body
const {caption} = req.body
const {secure_url:image} = await uploadToCloud(req.file.buffer,req.file.originalname);
console.log(image,'image');
const payload = {
    caption,
    image
}
await postModel.create(payload)
return res.status(201).json({
    message:"post created successfully!",
    data:payload
})
})

app.get('/posts',async(req,res)=>{
const posts = await postModel.find();
return res.status(200).json({
    message:"posts fetched successfully!",
    data:posts
})
})


//notes api
// app.post('/notes',async(req,res)=>{
// let title = req.body?.title;
// let description = req.body?.description;
// if(!title || !description || title.trim() == ''){
// return res.json({
//     message:"bad request, data missing",
// })
// }
// const existingNote = await noteModel.findOne({"title":title},{_id:1})
// if(existingNote){
//     return
// }
// const payload = {
//     title,description
// }
// //method 1 
// // let noteInstance = new noteModel(payload)
// // noteInstance.save()

// //method 2
// await noteModel.create(payload)

// res.status(201).json({
//     message:'note created',
//     data:payload
// })
// })

// app.delete('/notes/:id',async(req,res)=>{
// let {id} = req.params;
// if(!mongoose.isValidObjectId(id)){
//     return res.json({
//         message:"invalid id"
//     })
// }
// await noteModel.findByIdAndDelete(id)
// return res.status(200).json({
//     message:"successfully deleted note"
// })

// })

// app.patch('/notes/:id',async(req,res)=>{
// let {id} = req.params;
// if(!mongoose.isValidObjectId(id)){
//     return res.json({
//         message:"invalid id"
//     })
// }
// let updatedTitle = req.body?.title;
// let updatedDescription = req.body?.description;

// if(!updatedDescription && !updatedTitle){
//      return res.json({
//         message:"nothing to update"
//     })
// }
// let note = await noteModel.findById(id);

// const updatedPayload = {
//     title:!updatedTitle?note.title:updatedTitle,
//     description:!updatedDescription?note.description:updatedDescription,
//     _id:note._id
// }
// await noteModel.findByIdAndUpdate(id,updatedPayload)
// return res.status(200).json({
//     message:"successfully updated the note!",
//     data:updatedPayload
// })
// })

// app.get('/notes',async(req,res)=>{
// let notes = await noteModel.find({});
// return res.status(200).json({
//     message:"notes returned",
//     data:notes
// })
// })

module.exports = app;


//node jsbuffer, imagekit, cloudinary, multer,diskstorage vs memory storage, options?