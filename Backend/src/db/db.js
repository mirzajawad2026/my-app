const mongoose = require("mongoose");


async function connectDB() {
    await mongoose.connect("mongodb+srv://mirzajawad2026_db_user:p2yL0XkObmjTvA75@my-app.c9e5wkg.mongodb.net/post-app");
    console.log("connect DB");
    
}
module.exports = connectDB