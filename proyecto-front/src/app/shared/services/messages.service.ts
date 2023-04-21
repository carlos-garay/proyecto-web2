import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class MessagesService { //para mandar mensajes, falta implementar
  constructor(private httpClient : HttpClient) {}

}
