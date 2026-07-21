
const express = require("express");
const postModel = require("./models/post.model");
const multer = require("multer")
const uploadImage = require("./services/storage.service");
const Postmodel = require("./models/post.model");
const cors = require("cors")
const app = express();

app.use(cors());
app.use(express.json())
const multers = multer({
        storage: multer.memoryStorage()
})

app.post("/new-post", multers.single("image"), async (req, res) => {
    try {
        console.log("Body:", req.body);
        console.log("File:", req.file);

        if (!req.file) {
            return res.status(400).json({
                message: "Image is required"
            });
        }

        const result = await uploadImage(req.file.buffer);

        const post = await Postmodel.create({
            image: result.url,
            caption: req.body.caption
        });

        return res.status(201).json({
            message: "Post Created Successfully",
            post
        });

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            error: err.message
        });
    }
});
app.get("/take-post", async (req, res)=>{
        const post = await postModel.find();

        res.status(200).json({
                message : "Post Get Successfully",
                post
        })
})
module.exports = app