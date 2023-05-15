const path = require('path');

const ImageController = {

    getImage: (req,res)=>{
        const imageName = req.params.url;
        const imagePath = path.join(__dirname, '../../uploads/',imageName)
        console.log("ImagePath")
        console.log(imagePath);
        res.status(200).sendFile(imagePath)
    }
}

module.exports = ImageController;