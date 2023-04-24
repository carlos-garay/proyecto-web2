import { Component, OnInit, Input } from '@angular/core';
import { Grouppopulated } from 'src/app/shared/interfaces/grouppopulated';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { GroupService } from 'src/app/shared/services/group.service';

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
  selectedUser:string= ''

  constructor(private groupService : GroupService){ }

  selectUser(id:string){
    this.selectedUser = id
  }
  removeFromChannel(){
    //eliminar usuarios del canal 
    //hacer la llamada al servicio de grupo 
    this.groupService.eliminarUsuarioDegrupo(this.grupo._id,this.selectedUser).subscribe((response:any)=>{

    })
    console.log('eliminar' + this.selectedUser)
  }


}
