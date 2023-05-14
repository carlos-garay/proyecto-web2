const path = require('path');

const ImageController = {

    //registrar usuario, se tendrán cambios cuando se tenga implementación de tokens
    getImage: (req,res)=>{
        const imageName = req.params.url;
        const imagePath = path.join(__dirname, '../../uploads/',imageName)
        console.log("ImagePath")
        console.log(imagePath);
        res.status(200).sendFile(imagePath)
    }
}

module.exports = ImageController;