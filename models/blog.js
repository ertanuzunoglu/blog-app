const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    baslik: String,
    aciklama: String,
    resim: String,
    anasayfa: {
        type: Boolean,
        default: false
    },
    onay: {
        type: Boolean,
        default: false
    },
    category_id: String,
})

module.exports = mongoose.model("Blog", blogSchema)