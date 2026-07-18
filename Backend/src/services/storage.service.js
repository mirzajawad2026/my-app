const ImageKit = require("@imagekit/nodejs");

const imageKit = new ImageKit({
    publicKey: "public_H4bTy9cdzh6aejtAOe1QfWyP/RU=",
    privateKey : "private_FsTTgy6L+YKM19wLgUEVazfo0AI=",
})

async function uploadImage(buffer) {
    console.log(buffer);

    const result = await imageKit.files.upload({
        file : buffer.toString("base64"),
        fileName : "image.jpg"
    })

    return result;
}
module.exports = uploadImage