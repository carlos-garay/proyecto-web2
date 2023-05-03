import { Component } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms'
import { Router } from '@angular/router';

import { UserService} from 'src/app/shared/services/user.service'

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent {
  formPassword: FormGroup
  constructor(private formBuilder:FormBuilder,private userService:UserService,private router: Router){
    this.formPassword = formBuilder.group({
      password:['',[Validators.required]],
      confirm:['',Validators.required]
    })
  }

  updatePassword(){
    //llamar al servicio de usuario que tiene el metodo de actualizar el password del usuario 
    //si son iguales 
    let valores = this.formPassword.value
    let password: string=valores.password
    let confirm: string=valores.confirm
    if(password == confirm){ //si son iguales se hace la llamada al servicio
      this.userService.updatePassword(password).subscribe((Response:any)=>{
        //mostrar que fue exitoso con algun pop up o algo maybe
  
        this.router.navigate(['/'])
      })
    }
    //si no son iguales no sucede nada 
    
  }
}
