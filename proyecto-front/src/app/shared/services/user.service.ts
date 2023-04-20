import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Userpopulated } from '../interfaces/userpopulated';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //temporalmente vamos a hardcodear este usuario desde aqui en lugar de obtenerlo con el login 
  usuarioActual:Userpopulated = {
    _id: '',
    name: '',
    email: '',
    password: '',
    arrGroups: [],
    arrFriends: [],
    arrRequestsSent: [],
    arrRequestsReceived: [],
    arrDirectMessages: []
  }

  constructor(private httpClient : HttpClient) { }

  


  //SETTERS Y GETTERS DEL USUARIO ACTUAL

  //utiliza el id cargado en session storage despues de iniciar sesion para cargar el usuario actual al servicio
  //siempre que se ocupe informacion del usuario se va a obtener el usuarioActual y de ahi se saca la información necesaria
  loadUser(){ //esta funcion se llama al haber iniciado sesion
    //recuperamos el idUser de sessionstorage
    let idUser:string = ''
    const url:string = environment.apiUrl+'users/'+idUser
    this.httpClient.get(url).subscribe((response:any)=>{
      this.usuarioActual = response
    })

  }

  getUser(){
    return this.usuarioActual
  }

  setUser(user : Userpopulated){
    this.usuarioActual = user
  }

  //FUNCIONES DE LOGIN, REGISTRO Y MODIFICACIONES
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
    let idUser:string = this.usuarioActual._id //Este men se va a traer del session storage
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let url:string = environment.apiUrl+'users/'+idUser+'password'
    return this.httpClient.put(url,body,{headers})
  }

  updateName(name:string){
    let body = {
      name: name
    }
    let idUser:string = this.usuarioActual._id //Este men se va a traer del session storage
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let url:string = environment.apiUrl+'users/'+idUser+'name'
    return this.httpClient.put(url,body,{headers})
  }
}
