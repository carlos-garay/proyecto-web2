import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private httpClient : HttpClient) { }

  getGroup(idGroup:string){
    
    //let url:string = 'http://localhost:3000/groups/'+idGroup
    let url:string = environment.apiUrl+'groups/'+idGroup
    console.log(url)
    return this.httpClient.get(url)
  }
}
