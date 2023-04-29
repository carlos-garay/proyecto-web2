import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private httpService:HttpService, private userService:UserService) { }

  getRequests(){
    //let idUser:string = '643aed8b64f01a772cb50353' //se va a recuperar del session storage

    let idUser:string = this.userService.getUser()._id
    
    let url:string = environment.apiUrl+'users/'+idUser+'/requests'
    return this.httpService.get(url)
  }

  createRequest(email:string){
    //users/:idUser/requests ruta del API 

    let idUser:string = this.userService.getUser()._id

    //post request, donde body es el email
    let body = {
      friendEmail:email
    }
    let url:string = environment.apiUrl+'users/'+idUser+'/requests'
    return this.httpService.post(url,body)
  }

  acceptRequest(idRequest:string){
    //users/:idUser/requests/:reqId/accept

    let idUser:string = this.userService.getUser()._id //esta es la que se va a usar 
    let url:string = environment.apiUrl+'users/'+idUser+'/requests/'+idRequest+'/accept'
    let body = {} //vacio, no ocupa headers 
    return this.httpService.put(url,body)
    //llamada post 
  }

  declineRequest(idRequest:string){
    //users/:idUser/requests/:reqID/decline

    
    let idUser:string = this.userService.getUser()._id //este es el que se usa 
    let url:string = environment.apiUrl+'users/'+idUser+'/requests/'+idRequest+'/decline'
    let body = {} //vacio, no ocupa headers tampoco 
    return this.httpService.put(url,body)
  }
}
