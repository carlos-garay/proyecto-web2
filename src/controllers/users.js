const User = require('../models/users');
const Group = require('../models/groups');

const UserController = {

    //registrar usuario, se tendrán cambios cuando se tenga implementación de tokens
    registerUser: (req,res)=>{
        let idUser = req.body.email;
        let user = User(req.body);
        user.save().then((user) =>{
            res.status(200).send('Se creó el usuario ',user.email);
        })
        .catch(err =>{
            res.status(500);            
            res.send('Error en el servidor '+err);
        });
    },

    //Cambiar el nombre del usuario
    updateUserName: (req,res)=>{
        let nameChange = req.body.name;
        let idUser = req.params.idUser;
        User.findOneAndUpdate({ email: `${idUser}` },{name: nameChange}, { new : true }).then(user => {
            res.status(200).type('text/plain; charset=utf-8').send(`Se actualizó el usuario ${user.name}`);
        })
        .catch(err => {
            res.status(404).send("No se encontró el usuario con el id: "+idUser);
        });
    },

    //Cambiar el password del usuario, se modificará cuando se incluya la encripción 
    updateUserPassword: (req,res)=>{
        let passwordChange = req.body.password;
        let idUser = req.params.idUser;
        User.findOneAndUpdate({ email: `${idUser}` },{password: passwordChange}, { new : true }).then(user => {
            res.status(200).type('text/plain; charset=utf-8').send(`Se cambio la contraseña del usuario ${user.name}`);
        })
        .catch(err => {
            res.status(404).send("No se encontró el usuario con el id: "+idUser);
        });
    },

    //Obtener datos del usuario para cargar su página principal
    //Consulta la colección de grupos para cargar los grupos de los que es miembro
    loadUser: (req,res) => { 
        let idUser = req.params.idUser;
        User.findOne({email: `${idUser}`})
            .then(usuario => {
                //Obtenemos por cada id en el arreglo de grupos del usuario el objeto del grupo correspondiente
                //Para que posteriormente se puedan usar para cargar sus íconos y nombres en la aplicación
                if(usuario.arrGroups.length >0){
                    let arrRealGroup = [];
                    let counter = 0;
                    for(let idGroup of usuario.arrExam){
                        Group.findOne({_id: `${idGroup}`})
                            .then(group => {
                                counter++;
                                arrRealGroup.push(group);
                                if(counter == usuario._arrExam.length){
                                    //Al final concatenamos este arreglo a nuestro objeto de usuario y lo mandamos
                                    let objUser = {}
                                    Object.assign(objUser,usuario.toObject());
                                    objUser.allGroups = arrRealGroup; 
                                    res.status(200).type("application/json").json(objUser);
                                }    
                            })
                            .catch(err => {
                                throw err
                            })
                    }
                //Si no contiene ningún grupo
                }else{
                    let objUser = {}
                    Object.assign(objUser,usuario.toObject());
                    objUser.allGroups = []; 
                    res.status(200).type("application/json").json(objUser);
                }
            })
            .catch(err => {
                res.status(404).send("No se encontró el usuario con el id: "+idUser + err);
            })
    } 
}

module.exports = UserController