const moongose = require("mongoose");


const postScheme = new moongose.Schema({
    image : String,
    caption : String,
})

const Postmodel = new moongose.model("post", postScheme);
module.exports = Postmodel;