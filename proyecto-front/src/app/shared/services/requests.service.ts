import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private httpClient:HttpClient, private userService:UserService) { }

  getRequests(){
    //let idUser:string = '643aed8b64f01a772cb50353' //se va a recuperar del session storage

    let idUser:string = this.userService.getUser()._id
    
    let url:string = environment.apiUrl+'users/'+idUser+'/requests'
    return this.httpClient.get(url)
  }

  createRequest(email:string){
    //users/:idUser/requests ruta del API 

    let idUser:string = this.userService.getUser()._id

    //post request, donde body es el email
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let body = {
      email:email
    }
    let url:string = environment.apiUrl+'users/'+idUser+'/requests'
    return this.httpClient.post(url,body,{headers})
  }

  acceptRequest(idRequest:string){
    //users/:idUser/requests/:reqId/accept

    let idUser:string = this.userService.getUser()._id //esta es la que se va a usar 
    let url:string = environment.apiUrl+'users/'+idUser+'/requests/'+idRequest+'/accept'
    let body = {} //vacio, no ocupa headers 
    return this.httpClient.put(url,body)
    //llamada post 
  }

  declineRequest(idRequest:string){
    //users/:idUser/requests/:reqID/decline

    
    let idUser:string = this.userService.getUser()._id //este es el que se usa 
    let url:string = environment.apiUrl+'users/'+idUser+'/requests/'+idRequest+'/decline'
    let body = {} //vacio, no ocupa headers tampoco 
    return this.httpClient.put(url,body)
  }
}
