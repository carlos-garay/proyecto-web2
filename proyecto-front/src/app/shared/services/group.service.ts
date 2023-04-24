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
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url:string = environment.apiUrl+'groups/'+idGroup+'/channels/'+idChannel+'/messages';
    return this.httpClient.post(url,body,{headers});
  }

  eliminarUsuarioDegrupo(idGroup:string,email:string){
    let body = {
      email:email
    }

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url:string = environment.apiUrl+'groups/'+idGroup+'/remove';
    return this.httpClient.put(url,body,{headers})

  }

  deleteGroup(idGroup:string){
    let idUser:string = this.userService.getUser()._id ; //va a ir en el body
    let body = {
      idUser : idUser
    }
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: body
    };
    const url:string = environment.apiUrl+'groups/'+idGroup;
    return this.httpClient.delete(url,options)
  }

  changeGroupName(idGroup:string,newTitle:string){
    let idUser:string = this.userService.getUser()._id

    let UserInfo = {
      idUser:idUser,
      token:'undefined'
    }
    let groupInfo = {
      title:newTitle
    }
    let body = {
      UserInfo:UserInfo,
      groupInfo:groupInfo
    }
    const url:string = environment.apiUrl+'groups/'+idGroup+'/name';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put(url,body,{headers})
  }

  addTextChannel(idGroup:string){
    const url:string = environment.apiUrl+'groups/'+idGroup+'/channels';
    return this.httpClient.post(url,{})
  }
  addVoiceChannel(idGroup:string){
    const url:string = environment.apiUrl+'groups/'+idGroup+'/audioChannels';
    return this.httpClient.post(url,{})
  }

  addUserToGroup(idGroup:string, email:string){
    const url:string = environment.apiUrl+'groups/'+idGroup;
    let body = {
      email: email
    }
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put(url,body,{headers})
  }

  changeNameTextChannel(idGroup:string, idChannel:string, title:string){
    //body tiene UserInfo y channelInfo
    //channelinfo tiene title 
    let idUser:string = this.userService.getUser()._id
    let UserInfo = {
      idUser:idUser,
      token:'undefined'
    }
    let channelInfo = {
      title:title
    }
    let body = {
      UserInfo:UserInfo,
      channelInfo:channelInfo
    }
    let url:string = environment.apiUrl+'groups/'+idGroup+'/channels/'+idChannel+'/name';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put(url,body,{headers})
  }
  changeNameAudioChannel(idGroup:string, idChannel:string, title:string){
    //body tiene UserInfo y channelInfo
    //channelinfo tiene title 
    let idUser:string = this.userService.getUser()._id
    let UserInfo = {
      idUser:idUser,
      token:'undefined'
    }
    let channelInfo = {
      title:title
    }
    let body = {
      UserInfo:UserInfo,
      channelInfo:channelInfo
    }
    let url:string = environment.apiUrl+'groups/'+idGroup+'/audioChannels/'+idChannel+'/name';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put(url,body,{headers})
  }

  addUserTextChannel(idGroup:string, idChannel:string, email:string){ //agregar usuario a un canal de texto 
    let body = {
      email: email
    }
    let url:string = environment.apiUrl+'groups/'+idGroup+'/channels/'+idChannel+'addMember';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put(url,body,{headers})
  }
  removeUserTextChannel(idGroup:string, idChannel:string, email:string){
    let body = {
      email: email
    }
    let url:string = environment.apiUrl+'groups/'+idGroup+'/channels/'+idChannel+'removeMember';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put(url,body,{headers})
  }
  addUserAudioChannel(idGroup:string, idChannel:string, email:string){ //agregar usuario a un canal de texto 
    let body = {
      email: email
    }
    let url:string = environment.apiUrl+'groups/'+idGroup+'/audioChannels/'+idChannel+'addMember';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put(url,body,{headers})
  }
  removeUserAudioChannel(idGroup:string, idChannel:string, email:string){
    let body = {
      email: email
    }
    let url:string = environment.apiUrl+'groups/'+idGroup+'/audioChannels/'+idChannel+'removeMember';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put(url,body,{headers})
  }

  removeTextChannel(idGroup:string, idChannel:string ){
    let url:string = environment.apiUrl+'groups/'+idGroup+'/channels/'+idChannel;
    return this.httpClient.delete(url)
  }
  removeAudioChannel(idGroup:string, idChannel:string ){
    let url:string = environment.apiUrl+'groups/'+idGroup+'/channels/'+idChannel;
    return this.httpClient.delete(url)
  }
}
