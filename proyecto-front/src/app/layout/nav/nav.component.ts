import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService} from 'src/app/shared/services/user.service'
import { User } from 'src/app/shared/interfaces/user'
import { Userpopulated } from 'src/app/shared/interfaces/userpopulated';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  public usuario:Userpopulated = {
    _id: '',
    name: '',
    email: '',
    password: '',
    arrGroups: [],
    arrFriends: [],
    arrRequestsSent: [],
    arrRequestsReceived: [],
    arrDirectMessages:[]
  }
  //aqui llamamos al user controller y cargamos el valor 
  constructor(private userService:UserService,private router: Router){
    //mientras no tenemos la sesion y la conexion entre componentes SE HARDCODEA
    
    this.usuario._id="643aed8b64f01a772cb50353"
    this.usuario.arrFriends=[]
    this.usuario.arrGroups=[
      {
        "_id": "643d910ee3f376459277de77",
        "title": "grupo1",
        "image": "noimage",
        "arrUsers": [
          "643aed8b64f01a772cb50353",
          "643aed8b64f01a772cb50353",
          "643af5d692b9f9f15fb1544b",
          "643b02446664b9a3efbf1e60"
        ],
        "arrAdmins": [
          "643aed8b64f01a772cb50353"
        ],
        "arrChannels": [
          "643dab07cd8ff99e26bc3f56",
          "643dbf0527bc80c7910407c9"
        ],
        "arrAudioChannels": [],
        "__v": 0
      },
      {
        "_id": "643dbbb427bc80c7910407c4",
        "title": "grupo2",
        "image": "noimage",
        "arrUsers": [
          "643aed8b64f01a772cb50353",
          "643af5d692b9f9f15fb1544b"
        ],
        "arrAdmins": [
          "643aed8b64f01a772cb50353"
        ],
        "arrChannels": [
          "643dbf1c27bc80c7910407cc"
        ],
        "arrAudioChannels": [],
        "__v": 0
      }
    ]
    this.usuario.arrRequestsReceived=[]
    this.usuario.arrRequestsSent=[]
    this.usuario.name="Usuario precargado1"
    this.usuario.email="otro1@test.com"
    this.usuario.password="password"
    
  }


  //todos estos camaradas están mal 

  traerUsuario(){
    //debe ser desde el servicio el sessionman
    this.usuario = this.userService.getUser()
  }

  goToGroup(id:string){
    let url:string = '/group/'+id
    this.router.navigate([url])
  }
  
  
}
