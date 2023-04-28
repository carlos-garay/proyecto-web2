import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';
import { HttpService } from './http.service';


@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private httpService: HttpService, private userService:UserService) { }

  getGroup(idGroup:string){
    
    //let url:string = 'http://localhost:3000/groups/'+idGroup
    let url:string = environment.apiUrl+'groups/'+idGroup
    console.log(url)
    return this.httpService.get(url)
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
    let url: string = environment.apiUrl+'groups'
    return this.httpService.post(url,body)
  }

  getTextChannel(idGroup:string, idChannel:string){
    //groups/:idGroup/channels/:idChannel

    let url: string = environment.apiUrl+'groups/'+idGroup+'/channels/'+idChannel
    return this.httpService.get(url)
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
    const url:string = environment.apiUrl+'groups/'+idGroup+'/channels/'+idChannel+'/messages';
    return this.httpService.post(url,body);
  }

  eliminarUsuarioDegrupo(idGroup:string,email:string){
    let body = {
      email:email
    }

    const url:string = environment.apiUrl+'groups/'+idGroup+'/remove';
    return this.httpService.put(url,body)

  }

  deleteGroup(idGroup:string){
    let idUser:string = this.userService.getUser()._id ; //va a ir en el body
    const url:string = environment.apiUrl+'groups/'+idGroup;
    return this.httpService.delete(url)
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
    return this.httpService.put(url,body)
  }

  addTextChannel(idGroup:string){
    const url:string = environment.apiUrl+'groups/'+idGroup+'/channels';
    return this.httpService.post(url,{})
  }
  addVoiceChannel(idGroup:string){
    const url:string = environment.apiUrl+'groups/'+idGroup+'/audioChannels';
    return this.httpService.post(url,{})
  }

  addUserToGroup(idGroup:string, email:string){
    const url:string = environment.apiUrl+'groups/'+idGroup;
    let body = {
      email: email
    }
    return this.httpService.put(url,body)
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
    return this.httpService.put(url,body)
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
    return this.httpService.put(url,body)
  }

  addUserTextChannel(idGroup:string, idChannel:string, email:string){ //agregar usuario a un canal de texto 
    let body = {
      email: email
    }
    let url:string = environment.apiUrl+'groups/'+idGroup+'/channels/'+idChannel+'/addMember';
    return this.httpService.put(url,body)
  }
  removeUserTextChannel(idGroup:string, idChannel:string, email:string){
    let body = {
      email: email
    }
    let url:string = environment.apiUrl+'groups/'+idGroup+'/channels/'+idChannel+'/removeMember';
    return this.httpService.put(url,body)
  }
  addUserAudioChannel(idGroup:string, idChannel:string, email:string){ //agregar usuario a un canal de texto 
    let body = {
      email: email
    }
    let url:string = environment.apiUrl+'groups/'+idGroup+'/audioChannels/'+idChannel+'/addMember';
    return this.httpService.put(url,body)
  }
  removeUserAudioChannel(idGroup:string, idChannel:string, email:string){
    let body = {
      email: email
    }
    let url:string = environment.apiUrl+'groups/'+idGroup+'/audioChannels/'+idChannel+'/removeMember';
    return this.httpService.put(url,body)
  }

  removeTextChannel(idGroup:string, idChannel:string ){
    let url:string = environment.apiUrl+'groups/'+idGroup+'/channels/'+idChannel;
    return this.httpService.delete(url)
  }
  removeAudioChannel(idGroup:string, idChannel:string ){
    let url:string = environment.apiUrl+'groups/'+idGroup+'/channels/'+idChannel;
    return this.httpService.delete(url)
  }

  makeUserAdmin(idGroup:string, idToAdmin:string){
    let body = {_id: idToAdmin}
    let url:string = environment.apiUrl+'groups/'+idGroup+'/makeAdmin';
    return this.httpService.put(url,body)
  }

  revokeUserAdmin(idGroup:string, idToAdmin:string){
    let body = {_id: idToAdmin}
    let url:string = environment.apiUrl+'groups/'+idGroup+'/revokeAdmin';
    return this.httpService.put(url,body)
  }
}
