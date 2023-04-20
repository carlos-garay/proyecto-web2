import { Component } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms'
import { Router } from '@angular/router';

import { UserService} from 'src/app/shared/services/user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formLogin: FormGroup
  constructor(private formBuilder:FormBuilder,private userService:UserService,private router: Router){
    this.formLogin = formBuilder.group({ //lleva this el formBuilder?
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required]]
    })
  }
  loginUsuario(){
    //recuperamos los valores del form y los pasamos como parametro a la funcion del servicio 
    let valores = this.formLogin.value
    let email:string = valores.email
    let password: string= valores.password
    this.userService.loginUser(email,password).subscribe((response:any)=>{ //al hacer login nos regresa el id del nuevo usuario

      //la response va a traer el usuario y va a traer el token
      //queremos que la informacion dl usuario se suba a sessionStorage como UserInfo, dice el master
      //que es ilegal hacerlo desde un componente, asi que tal vez se ocupa una funcion void en el servicio que lo haga 
      
      //hacer que se ejecute la funcion de cargar usuario desde nav ahora que ya tenemos el token cargado 
    })
  }
}
