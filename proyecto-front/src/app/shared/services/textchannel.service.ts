import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class TextchannelService {
  constructor(private httpClient : HttpClient) {}

  getChannel(idGroup:string,idChannel:string ){ //esta funcion se llama al entrar a un canal de un grupo
    //me equivoque y cree el servicio para los canales de grupo cuando el de recuperar el de amigo esta en friend xd
  }

}
