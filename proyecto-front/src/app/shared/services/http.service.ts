import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient, private userService: UserService) {}
  //VA A FALTAR TOKEN
  get(url: string): Observable<any> {
    const headers= new HttpHeaders({
      'user': this.userService.usuarioActual._id
    });
    return this.httpClient.get(url,{headers});
  }
  
  post(url: string,body: any): Observable<any> {
    const headers= new HttpHeaders({
      'user': this.userService.usuarioActual._id
    }).set('Content-Type', 'application/json');
    return this.httpClient.post(url,body,{headers});
  }

  put(url: string,body: any): Observable<any> {
    const headers= new HttpHeaders({
      'user': this.userService.usuarioActual._id
    }).set('Content-Type', 'application/json');
    return this.httpClient.put(url,body, {headers});
  }

  delete(url: string): Observable<any> {
    const headers= new HttpHeaders({
      'user': this.userService.usuarioActual._id
    });
    return this.httpClient.delete(url, {headers});
  }

}
