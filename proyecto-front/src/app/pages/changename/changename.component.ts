import { Component } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms'
import { Router } from '@angular/router';

import { UserService} from 'src/app/shared/services/user.service'

@Component({
  selector: 'app-changename',
  templateUrl: './changename.component.html',
  styleUrls: ['./changename.component.scss']
})
export class ChangenameComponent {
  formName: FormGroup
  constructor(private formBuilder:FormBuilder,private userService:UserService,private router: Router){
    this.formName = formBuilder.group({ 
      name:['',Validators.required]
    })
  }

  changeName(){
    let valores = this.formName.value
    //verificar si tiene un error y matchean los vergas 
    let name:string =valores.name
    this.userService.updateName(name).subscribe((Response:any)=>{

      this.router.navigate(['/'])
    })
  }
}
