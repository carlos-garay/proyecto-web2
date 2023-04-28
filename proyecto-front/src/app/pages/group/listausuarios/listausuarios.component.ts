import { Component, OnInit, Input } from '@angular/core';
import { Grouppopulated } from 'src/app/shared/interfaces/grouppopulated';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { GroupService } from 'src/app/shared/services/group.service';
import { User } from 'src/app/shared/interfaces/user';
import { Group } from 'src/app/shared/interfaces/group';

@Component({
  selector: 'app-listausuarios',
  templateUrl: './listausuarios.component.html',
  styleUrls: ['./listausuarios.component.scss']
})
export class ListausuariosComponent {
  @Input() grupo:Grouppopulated = {
    _id: '',
    title: '',
    image: '',
    arrUsers: [],
    arrAdmins: [],
    arrChannels: [],
    arrAudioChannels: []
  }
  selectedUserEmail:string= ''
  selectedUserId:string = ''

  constructor(private groupService : GroupService){ }

  selectUser(email:string, id:string){
    this.selectedUserEmail = email
    this.selectedUserId = id
  }

  removeFromChannel(){
    //eliminar usuarios del canal 
    //hacer la llamada al servicio de grupo 
    this.groupService.eliminarUsuarioDegrupo(this.grupo._id,this.selectedUserEmail).subscribe((response:any)=>{

    })
    console.log('eliminar' + this.selectedUserEmail)
  }

  findAdmin(group: Grouppopulated, idUser: string){
    return group.arrAdmins.find(({_id}) => _id == idUser)
  }

  makeAdmin(){
    console.log(this.selectedUserId)
    this.groupService.makeUserAdmin(this.grupo._id, this.selectedUserId).subscribe((response:any)=>{

    })
  }

  revokeAdmin(){
    this.groupService.revokeUserAdmin(this.grupo._id, this.selectedUserId).subscribe((response:any)=>{
      
    })
  }


}
