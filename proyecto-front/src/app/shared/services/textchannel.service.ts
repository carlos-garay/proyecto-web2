import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TextchannelPopulated } from '../interfaces/textchannelpopulated';



@Injectable({
  providedIn: 'root'
})
export class TextchannelService {

  canalActual:TextchannelPopulated = {
    _id: '',
    title: '',
    arrMembers: [],
    private: false,
    arrMessages: []
  }

  constructor(private httpClient : HttpClient) {}

  getChannel(idGroup:string,idChannel:string ){ //esta funcion se llama al entrar a un canal de un grupo
  }

}
