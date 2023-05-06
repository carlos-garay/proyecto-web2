import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  constructor(private httpService : HttpService, private userService:UserService) {}

  loadFriends(){ //esta funcion se llama al elegir mensajes directos 

    let idUser:string = this.userService.getUser()._id

    const url:string = environment.apiUrl+'users/'+idUser+'/friends'
    return this.httpService.get(url)
  }

  removeFriend(idFriend:string){
    let idUser:string = this.userService.getUser()._id
    let url:string = environment.apiUrl+'users/'+idUser+'/friends/'+idFriend+'/remove'
    console.log(idFriend)
    return this.httpService.delete(url)
  }

  getDMChannel(idFriend:string ){ //esta funcion se llama al entrar a un DM
    let idUser:string = this.userService.getUser()._id

    const url:string = environment.apiUrl+'users/'+idUser+'/friends/'+idFriend
    return this.httpService.get(url)
  }

  sendDM(idChannel:string, content:string){

    let idUser:string = this.userService.getUser()._id

    let UserInfo = {
      idUser:idUser,
      token:'undefined'
    }
    let messageInfo = {
      content: content
    }
    let body = {
      UserInfo:UserInfo,
      messageInfo:messageInfo
    }
    const url:string = environment.apiUrl+'users/'+idUser+'/friends/'+idChannel+'/send';
    return this.httpService.post(url,body);
  }

}



