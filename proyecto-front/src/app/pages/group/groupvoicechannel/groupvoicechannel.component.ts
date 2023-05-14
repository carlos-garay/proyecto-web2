import { Component,OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { environment } from 'src/environments/environment';
import { io } from 'socket.io-client';
import { Audiouser } from 'src/app/shared/interfaces/audiouser';

@Component({
  selector: 'app-groupvoicechannel',
  templateUrl: './groupvoicechannel.component.html',
  styleUrls: ['./groupvoicechannel.component.scss']
})
export class GroupvoicechannelComponent implements OnDestroy, OnInit {
  enabled:boolean = true //si queremos que el chat este funcionando 
  socket: any; 
  listUsers:Audiouser[] = []; // aqui se van a agregar los usuarios 
  userStatus={
    microphone: true, //si esta en 1, significa que si estamos mandando voz
    mute :false, //si mute esta en 1, es porque no queremos escuchar 
    username: this.userService.getUser().name,
    userId: this.userService.getUser()._id
  }
  
  constructor(private route: ActivatedRoute, private userService:UserService){ }
  idChannel:string = ''

  //cargar componente / unirme canal 
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idChannel = params['idChannel']

    })
    this.socket = io(environment.apiUrl)

    //unirme al room 
    this.socket.emit('joinVoice',{idChannel:this.idChannel})

    //estar en espera de la informacion de otros usuarios cuando se unan 
    this.socket.on('getUserInfo',(data:any)=>{
      let otherUserStatus = data
      let id = otherUserStatus.userId

      const hasObject = this.listUsers.some(obj => obj.userId === id);

      if(hasObject){
        //realizar comparacion si es igual a ver si tenemos qu ecambiar las cosas 

        //falta implementar 
      }
      else{
        this.listUsers.push(otherUserStatus)
      }

    })
    this.socket.on('userLeft',(data:any)=>{
      console.log(data)
      console.log(this.listUsers)
      let idUser = data
      console.log('se salio '+idUser)
      //sacar al usuario que se va a salir del arreglo
      this.listUsers = this.listUsers.filter(obj => obj.userId !== idUser);
    })

    //cuando llegue una toma de voz 
    this.socket.on('send',(data:any)=>{
      //mute en falso es que si uiere escuchar 
      console.log('recibiendo evento de voz ')
      //console.log(data)
      if(!this.userStatus.mute){ //si el usuario no tiene el canal silenciado
        var audio = new Audio(data)
        //console.log(audio)
        audio.play()
      }
    })

    this.mainFunction(1000); //llamarla con tiempo de 1000 ms 

  }


  ngOnDestroy(): void {
    
    this.enabled = false
    
    //emitir que me saquen de la lista de usuarios conectados
    setTimeout(()=>{
      let obj = {
        idChannel:this.idChannel,
        idUser:this.userService.getUser()._id
      }
      this.socket.emit('leaveVoice',obj)
    },1010)


    console.log('destruyendo componente voiceChannel')
  }

  //funcion principal 
  mainFunction(time:number){
    console.log('llego aqui a')
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      var madiaRecorder = new MediaRecorder(stream);
      madiaRecorder.start();
      console.log('llego aqui b')
      var audioChunks:any = [];
      
      madiaRecorder.addEventListener("dataavailable", function (event) {
        audioChunks.push(event.data);
      });
  
      //necesito hacer que este carnal se deje de ejecutar 
      madiaRecorder.addEventListener("stop", () => {

        var audioBlob = new Blob(audioChunks);
  
        audioChunks = [];
  
        var fileReader = new FileReader();
        fileReader.readAsDataURL(audioBlob);
        //console.log('llego aqui d')
        fileReader.onloadend = () => { //cambiando de function() a => para quedarme con el this 
          if (!this.userStatus.microphone || this.enabled==false) return; //si tiene microfono apagado no se hace nada
          //console.log('llego aqui e')
          var base64String = fileReader.result; //el clip de voz de 1 segundo 
          let data = {
            idChannel: this.idChannel,
            data:base64String
          }
          this.socket.emit("voice",data)
          //this.socket.emit("voice", base64String);
  
        };
  
        madiaRecorder.start();
  
        if(this.enabled==true){
          setTimeout(() => {
            madiaRecorder.stop();
            this.sendUserInfo(); //cada segundo vamos a mandar informacion actualizada de los miembros del canal de voz 
          }, time);
        }
        else{
          console.log('turbo loop ends :D')
          let obj = {
            idChannel:this.idChannel,
            userStatus:this.userStatus
          }
          //this.socket.emit('leaveVoice',obj)
        }

      });


  
      setTimeout(() => {
        madiaRecorder.stop();
        this.sendUserInfo();
      }, time);
    });
  }

  //esta funcion va a estar dentro del setInterval 
  sendUserInfo(){
    let obj = {
      idChannel:this.idChannel,
      userStatus:this.userStatus
    }
    this.socket.emit('userInfo',obj)
  }

  toggleMicrophone(){ //togglear tu microfono para no hablar 
    console.log('toggleMic')
    this.userStatus.microphone = !this.userStatus.microphone
  }
  toggleMute(){ //togglear silenciacion de otros para no escuchar 
    console.log('togglemute')
    this.userStatus.mute = !this.userStatus.mute
  }
}
