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
}
