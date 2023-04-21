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

    let idUser:string = this.userService.getUser()._id

    const url:string = environment.apiUrl+'users/'+idUser+'/friends'
    return this.httpClient.get(url)
  }

  removeFriend(id:string){
    let idUser:string = this.userService.getUser()._id
    let url:string = environment.apiUrl+'users/'+idUser+'/friends/'+id+'/remove'
    console.log(id)
    return this.httpClient.delete(url)
  }

  getDMChannel(idFriend:string ){ //esta funcion se llama al entrar a un DM
    let idUser:string = this.userService.getUser()._id

    const url:string = environment.apiUrl+'users/'+idUser+'/friends/'+idFriend
    return this.httpClient.get(url)
  }

}



