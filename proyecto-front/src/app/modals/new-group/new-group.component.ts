import { Component } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { GroupService } from 'src/app/shared/services/group.service';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.scss']
})
export class NewGroupComponent {
  formNewGroup: FormGroup
  constructor(private formBuilder:FormBuilder,private router: Router, private groupService:GroupService){
    this.formNewGroup = formBuilder.group({ //lleva this el formBuilder?
      nombreGrupo:['',Validators.required],
      imagenGrupo:['',[Validators.required]]
    })
  }

  crearNuevoGrupo(){
    let valores = this.formNewGroup.value
    console.log(valores)
    //hacer la llamada al servicio de los grupos 
    this.groupService.createGroup(valores.nombreGrupo,valores.imagenGrupo).subscribe((response:any)=>{
      //ya que fue creado el nuevo grupo
      //router link que nos lleve al nuevo grupo recien creado
      let url:string = '/group/'+response._id
    this.router.navigate([url])
    })
  }
}
