const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title:String,
    description:String   
})

//schema -> set of rules
//model -> a tool for performing crud , it takes schema and 
//         creates tool for this schema so we can perform crud

const noteModel = mongoose.model('note',schema)
module.exports = noteModel