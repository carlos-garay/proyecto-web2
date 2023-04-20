import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private httpClient:HttpClient) { }

  getRequests(){
    let idUser:string = '643aed8b64f01a772cb50353' //se va a recuperar del session storage
    let url:string = environment.apiUrl+'users/'+idUser+'/requests'
    return this.httpClient.get(url)
  }

  acceptRequest(idRequest:string){
    //users/:idUser/requests/:reqId/accept

    let idUser:string = '' //se va a recuperar del session storage
    let url:string = environment.apiUrl+'users/'+idUser+'/requests/'+idRequest+'/accept'
    let body = {} //vacio, no ocupa headers 
    return this.httpClient.put(url,body)
    //llamada post 
  }

  declineRequest(idRequest:string){
    //users/:idUser/requests/:reqID/decline

    let idUser:string = '' //se va a recuperar del session storage
    let url:string = environment.apiUrl+'users/'+idUser+'/requests/'+idRequest+'/decline'
    let body = {} //vacio, no ocupa headers tampoco 
    return this.httpClient.put(url,body)
  }
}
