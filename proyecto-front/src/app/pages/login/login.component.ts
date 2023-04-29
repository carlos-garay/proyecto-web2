import { Component } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

import { UserService} from 'src/app/shared/services/user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formLogin: FormGroup
  constructor(private formBuilder:FormBuilder,private userService:UserService,private router: Router, private authService:AuthService){
    this.formLogin = formBuilder.group({ 
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required]]
    })
  }
  
  loginUsuario(){
    //recuperamos los valores del form y los pasamos como parametro a la funcion del servicio 
    let valores = this.formLogin.value
    let email:string = valores.email
    let password: string= valores.password

    this.userService.loginUser(email,password).subscribe((response:any)=>{
      console.log(response)
      localStorage.setItem('idUser',response._id);
      this.authService.setToken(response.token);
      //la response va a traer el usuario y va a traer el token
      
      //subimos a sessionStorage el valor del ID 
      //se llama loadUser desde el servicio para que traiga el usuario actual, el ID que usa el servicio ya va a estar en el session storage
      this.userService.loadUser(response._id)
      //hacer que desde nav se ejecute la funcion getUser 
      this.router.navigate(['/'])
    })
  }
}
