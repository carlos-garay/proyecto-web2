import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Grouppopulated } from 'src/app/shared/interfaces/grouppopulated';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { GroupService } from 'src/app/shared/services/group.service';
import { User } from 'src/app/shared/interfaces/user';
import { Group } from 'src/app/shared/interfaces/group';
import { HttpErrorResponse } from '@angular/common/http';
import { ShowErrorService } from 'src/app/shared/services/show-error.service';

@Component({
  selector: 'app-listausuarios',
  templateUrl: './listausuarios.component.html',
  styleUrls: ['./listausuarios.component.scss']
})
export class ListausuariosComponent {

  @Output() removeUserEvent = new EventEmitter<User>();
  @Output() makeAdminEvent = new EventEmitter<any>();
  @Output() revokeAdminEvent = new EventEmitter<any>();

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

  constructor(private groupService : GroupService, private showErrorService:ShowErrorService){ }

  selectUser(email:string, id:string){
    this.selectedUserEmail = email
    this.selectedUserId = id
  }

  removeFromGroup(){
    //hacer la llamada al servicio de grupo 
    this.groupService.eliminarUsuarioDegrupo(this.grupo._id,this.selectedUserEmail).subscribe({
      next:(response:any)=>{
        this.removeUserEvent.emit(response)
      },
      error: (err: HttpErrorResponse)=>{
        this.showErrorService.openError(err.error)
      }
    })
  }

  findAdmin(group: Grouppopulated, idUser: string){
    return group.arrAdmins.find(({_id}) => _id == idUser)
  }

  makeAdmin(){
    // this.groupService.makeUserAdmin(this.grupo._id, this.selectedUserId).subscribe((response:any)=>{
    //   this.makeAdminEvent.emit(response);
    // })
    this.groupService.makeUserAdmin(this.grupo._id, this.selectedUserId).subscribe({
      next:(response:any)=>{
        this.makeAdminEvent.emit(response);
      },
      error: (err: HttpErrorResponse)=>{
        this.showErrorService.openError(err.error)
      }
    })
  }

  revokeAdmin(){
    // this.groupService.revokeUserAdmin(this.grupo._id, this.selectedUserId).subscribe((response:any)=>{
    //   this.revokeAdminEvent.emit(response);
    // })
    this.groupService.revokeUserAdmin(this.grupo._id, this.selectedUserId).subscribe({
      next:(response:any)=>{
        this.revokeAdminEvent.emit(response);
      },
      error: (err: HttpErrorResponse)=>{
        this.showErrorService.openError(err.error)
      }
    })
  }


}
