const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    image:String,
    caption:String
})

const postModel = new mongoose.model("post",schema);
module.exports = postModel