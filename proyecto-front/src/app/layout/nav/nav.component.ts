import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { UserService} from 'src/app/shared/services/user.service'
import { User } from 'src/app/shared/interfaces/user'
import { Userpopulated } from 'src/app/shared/interfaces/userpopulated';
import { Group } from 'src/app/shared/interfaces/group';

import { MatDialog } from '@angular/material/dialog';
import { NewGroupComponent } from 'src/app/modals/new-group/new-group.component';
import { AuthService } from 'src/app/shared/services/auth.service';

import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{
  public usuario:Userpopulated; 
  logedIn: boolean = false;

  socket :any

  //aqui llamamos al user controller y cargamos el valor 
  constructor(private userService:UserService,private router: Router, private matDialog:MatDialog, private authService: AuthService){ 
    this.usuario = userService.getUser();
    userService.observableUser.subscribe((user : Userpopulated)=>{
      this.usuario = user;
    })

    this.authService.authStatus.subscribe((status: boolean)=>{
      this.logedIn = status;
    })
  }



  ngOnInit(): void {
    //traer el usuario 
    this.traerUsuario()

    this.socket = io(environment.apiUrl)
    //prepararse para escuchar cuando se cree un grupo y sea agregado
    //escuchar cuando un grupo sea borrado y este usuario forme parte 

    //addedToGroup
    this.socket.on('addedToGroup',(data:any)=>{
      //se recibe cuando alguien en el mundo fue agregado a un grupo
      //tengo que checar si el mail del usuario con el que tengo sesion iniciada es el mismo mail que viene en data
      //en caso que si, agregare el grupo al arrGroups del usuario del componente
      let email = data.email
      let group = data.group
      if (email == this.usuario.email){
        //agrega el grupo al arreglo de grupos de usuario
        //convertir group que es populated, a un grupo normal para que el push no truene 
        let tempGroup:Group = {
          _id: group._id,
          title: group.title,
          image: '',
          arrUsers: [],
          arrAdmins: [],
          arrChannels: [],
          arrAudioChannels: []
        }
        this.usuario.arrGroups.push(tempGroup)
      }
    })
  }

  traerUsuario(){
    //debe ser desde el servicio el sessionman
    let user = localStorage.getItem('idUser') || '';
    this.userService.loadUser(user);
    this.usuario = this.userService.getUser()
  }

  goToGroup(id:string){
    let url:string = '/group/'+id
    this.router.navigate([url])
  }
  
  //FUNCIONES DE DIALOGOS / MODALES 
  openGroupDialog(){
    this.matDialog.open(NewGroupComponent,{})
  }

  logOut(){
    //por implementar
    this.userService.logoutUser()
    this.router.navigate(['/'])
  }
}
