import { Component } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService} from 'src/app/shared/services/user.service'
import { ShowErrorService } from 'src/app/shared/services/show-error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formLogin: FormGroup
  constructor(private formBuilder:FormBuilder,private userService:UserService,private router: Router, 
    private authService:AuthService, private showErrorService : ShowErrorService){
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


    this.userService.loginUser(email,password).subscribe({
      next:(response:any)=>{
        console.log(response)
        this.userService.setId(response._id)
        this.authService.setToken(response.token);
        this.userService.loadUser(response._id)
        //hacer que desde nav se ejecute la funcion getUser 
        this.router.navigate(['/'])
      },
      error: (err: HttpErrorResponse)=>{
        this.showErrorService.openError(err.error)
      }
    })
  }
}
