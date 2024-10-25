// mongoose schema 
const mongoose = require('mongoose')

// blue print for book details

const bookSchema =new mongoose.Schema({
    title:String,
    author:String
})

// model for book's blueprint
const bookModel = mongoose.model('book', bookSchema)
module.exports = bookModel;