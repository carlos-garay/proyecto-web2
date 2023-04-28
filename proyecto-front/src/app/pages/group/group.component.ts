import { Component, OnInit} from '@angular/core';
import { Grouppopulated } from 'src/app/shared/interfaces/grouppopulated';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { GroupService } from 'src/app/shared/services/group.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent{
  grupo:Grouppopulated = {
    _id: '',
    title: '',
    image: '',
    arrUsers: [],
    arrAdmins: [],
    arrChannels: [],
    arrAudioChannels: []
  }

  constructor(private route: ActivatedRoute,private router:Router, private groupService:GroupService) {}

  ngOnInit(){

    this.route.params.subscribe(params => {
      const idGrupo = params['idGroup']
      console.log(idGrupo)
      
      //esta incompleto
      this.groupService.getGroup(idGrupo).subscribe((response:any)=>{
        console.log(response)
        this.grupo = response
      })
    })
  }
}
