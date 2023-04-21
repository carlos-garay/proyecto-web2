import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService} from 'src/app/shared/services/user.service'
import { User } from 'src/app/shared/interfaces/user'
import { Userpopulated } from 'src/app/shared/interfaces/userpopulated';

import { MatDialog } from '@angular/material/dialog';
import { NewGroupComponent } from 'src/app/modals/new-group/new-group.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
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
  constructor(private userService:UserService,private router: Router, private matDialog:MatDialog){  }

  ngOnInit(): void {
    //traer el usuario 
    this.traerUsuario()
  }

  traerUsuario(){
    //debe ser desde el servicio el sessionman
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
}
