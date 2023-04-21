import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  constructor(private httpClient : HttpClient, private userService:UserService) {}

  loadFriends(){ //esta funcion se llama al elegir mensajes directos 

    let idUser:string = '643aed8b64f01a772cb50353' 
    //let idUser:string = this.userService.getUser()._id

    const url:string = environment.apiUrl+'users/'+idUser+'/friends'
    return this.httpClient.get(url)
  }

  removeFriend(idFriend:string){
    let idUser:string = '643aed8b64f01a772cb50353' 
    //let idUser:string = this.userService.getUser()._id
    let url:string = environment.apiUrl+'users/'+idUser+'/friends/'+idFriend+'/remove'
    console.log(idFriend)
    return this.httpClient.delete(url)
  }

  getDMChannel(idFriend:string ){ //esta funcion se llama al entrar a un DM
    let idUser:string = '643aed8b64f01a772cb50353' 
    //let idUser:string = this.userService.getUser()._id

    const url:string = environment.apiUrl+'users/'+idUser+'/friends/'+idFriend
    return this.httpClient.get(url)
  }

  sendDM(idFriend:string, content:string){
    let idUser:string = '643aed8b64f01a772cb50353' 
    //let idUser:string = this.userService.getUser()._id

    let UserInfo = {
      idUser:idUser,
      token:'undefined'
    }
    let user = this.userService.getUser()
    let messageInfo = {
      content: content
    }
    let body = {
      UserInfo:UserInfo,
      messageInfo:messageInfo
    }
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url:string = environment.apiUrl+'users/'+idUser+'/friends/'+idFriend+'/send';
    return this.httpClient.post(url,body,{headers});
  }

}



