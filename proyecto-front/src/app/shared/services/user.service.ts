import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient : HttpClient) { }
  getUser(){
    //recuperamos el idUser de sessionstorage
    let idUser:string = ''
    const url:string = environment.apiUrl+'users/'+idUser
    return this.httpClient.get(url);
  }
  //no funciona 
  registerUser(name: string, email: string, password:string){
    let body = {
      name: name,
      email: email,
      password: password
    }
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    //body va a traer los valores recuperados del form
    let url:string = environment.apiUrl+'users/register'
    return this.httpClient.post(url, body, { headers })
  }

  loginUser(email: string, password:string){
    let body = {
      email: email,
      password: password
    }
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    //body va a traer los valores recuperados del form 
    //el id debe subirse al sessionman desde aqui cuando se obtiene, lo que se retorna sera el id 
    let url:string = environment.apiUrl+'users/login'
    return this.httpClient.post(url, body, { headers })
  }

  updatePassword(password:string){
    let body = {
      password: password
    }
    let idUser:string = '' //Este men se va a traer del session storage
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let url:string = environment.apiUrl+'users/'+idUser+'password'
    return this.httpClient.put(url,body,{headers})
  }

  updateName(name:string){
    let body = {
      name: name
    }
    let idUser:string = '' //Este men se va a traer del session storage
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let url:string = environment.apiUrl+'users/'+idUser+'name'
    return this.httpClient.put(url,body,{headers})
  }
}
