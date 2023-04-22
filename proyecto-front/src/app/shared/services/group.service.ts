import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private httpClient : HttpClient, private userService:UserService) { }

  getGroup(idGroup:string){
    
    //let url:string = 'http://localhost:3000/groups/'+idGroup
    let url:string = environment.apiUrl+'groups/'+idGroup
    console.log(url)
    return this.httpClient.get(url)
  }

  createGroup(name:string,img:string){
    let groupInfo = {
      title:name,
      image:img
    }
    let user = this.userService.getUser()
    let UserInfo = {
      idUser:user._id
    }
    let body = {
      UserInfo:UserInfo,
      groupInfo:groupInfo
    }
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let url: string = environment.apiUrl+'groups'
    return this.httpClient.post(url,body,{headers})
  }

  getTextChannel(idGroup:string, idChannel:string){
    //groups/:idGroup/channels/:idChannel

    let url: string = environment.apiUrl+'groups/'+idGroup+'/channels/'+idChannel
    return this.httpClient.get(url)
  }

  sendMessage(idGroup:string, idChannel:string,content:string){
    let idUser:string = '643aed8b64f01a772cb50353' 
    //let idUser:string = this.userService.getUser()._id

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
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url:string = environment.apiUrl+'groups/'+idGroup+'/channels/'+idChannel+'/messages';
    return this.httpClient.post(url,body,{headers});
  }

}
