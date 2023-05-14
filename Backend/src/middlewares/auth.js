const jwt = require('jsonwebtoken');

function auth(req,res,next){
    let token = req.headers.token; 
    //console.log(token);

    if (token) {
        jwt.verify(token, process.env.TOKEN_KEY , (err, decoded) => {
            if (err) return res.status(401).send("El token no es valido "+err);
            return next()
        });
    }
    else{
        return res.status(401).send("El token no es válido"); 
    }
}


module.exports = auth;
