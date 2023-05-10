import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup,Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'src/app/shared/interfaces/message';
import { io } from 'socket.io-client';

import { TextchannelPopulated } from 'src/app/shared/interfaces/textchannelpopulated';
import { FriendsService } from 'src/app/shared/services/friends.service';
import { TextchannelService } from 'src/app/shared/services/textchannel.service';
import { UserService } from 'src/app/shared/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-friendchat',
  templateUrl: './friendchat.component.html',
  styleUrls: ['./friendchat.component.scss']
})
export class FriendchatComponent implements OnInit, OnDestroy {
  formSendDM: FormGroup;
  inputValue: string = "";
  idChannel: string = "";
  channel:TextchannelPopulated={
    _id: '',
    title: '',
    arrMembers: [],
    private:false,
    arrMessages: [] 
  }

  socket :any

  constructor(private formBuilder:FormBuilder,private route: ActivatedRoute,
     private friendsService: FriendsService,private router:Router,private txtChannelService: TextchannelService, private userService: UserService)
    { 
      this.formSendDM = formBuilder.group({ 
        message:''
      })
    }

    
  ngOnInit(){
    this.route.params.subscribe(params => {
      this.idChannel = params['idChannel']
      this.channel = this.txtChannelService.canalActual
    })

    this.socket = io(environment.apiUrl)

    //declarar recepción de mensajes
    this.socket.on('newMessageDM',(data:any)=>{
      console.log('alguien envio un mensaje ')
      this.channel.arrMessages.push(data)
    })

    //suscribir al usuario al grupo
    this.socket.emit('joinDM',{idChannel:this.idChannel})
  }

  ngOnDestroy(): void {
    //vamos a mandar el evento leaveDm para desconectar el socket 
    this.socket.emit('leaveDM',{idChannel:this.idChannel})
  }

  onEnter(event: Event) {
    if(event instanceof KeyboardEvent){
      let keyEvent:KeyboardEvent = event
      if (this.inputValue.trim() !== '' && !keyEvent.shiftKey) {
        this.sendMessage()
      }
    }
  }

  sendMessage(){
      let message:string = this.formSendDM.value.message
      this.friendsService.sendDM(this.idChannel,message).subscribe((response:any)=>{
        this.inputValue=""
        response.sender = this.userService.usuarioActual.name;
        this.channel.arrMessages.push(response)

        //generar el evento 
        let obj = {
          idChannel:this.idChannel,
          message:response
        }
        this.socket.emit('sendMessageDM',obj)
    })
  }

}
