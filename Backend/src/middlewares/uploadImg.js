const multer = require('multer')

const multerStorage = multer.diskStorage({
  destination: (req,file,cb) =>{
      cb(null,'./uploads')
  }, //establece el nombre de la carpeta
  filename: (req,file,cb) => {
      let nombre = new Date().getTime();
      nombre = file.originalname +'_'+nombre;
      const extension = file.originalname.split('.').pop();
      console.log(file.originalname)
      cb(null,`${nombre}.${extension}`); // el nombre del archivo
  }
});

const filtroArchivoImg = (req, file, cb) =>{
  const flag = file.mimetype.startsWith('image');
  cb(null, flag);
}

const upload = multer({storage:multerStorage, fileFilter: filtroArchivoImg, limits: {fieldSize: 25*1024*1024}});

module.exports = upload;