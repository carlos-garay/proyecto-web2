import { Component } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms'
import { Router } from '@angular/router';

import { UserService} from 'src/app/shared/services/user.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  formRegister: FormGroup
  constructor(private formBuilder:FormBuilder,private userService:UserService,private router: Router){
    this.formRegister = formBuilder.group({ //lleva this el formBuilder?
      name:['',Validators.required],
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required]],
      confirm:['',Validators.required],
      aceptar:[false,Validators.requiredTrue]
    })
  }

  registrarUsuario(){
    //recuperamos los valores del form y los pasamos como parametro a la funcion del servicio 
    let valores = this.formRegister.value
    //verificar si tiene un error y matchean los vergas 
    let name:string =valores.name
    let email:string = valores.email
    let password: string=valores.password
    let confirm: string=valores.confirm
    if(password == confirm){
      this.userService.registerUser(name,email,password).subscribe((response:any)=>{ //al hacer login nos regresa el id del nuevo usuario
        //si se registro correcto te lleva a la pagina del login 
        this.userService.loadUser(response._id)
        this.router.navigate(['/'])
      })
    }
    //si no no se hace nada 
    //mandar mensajes de error mayb 
        
  }

}
