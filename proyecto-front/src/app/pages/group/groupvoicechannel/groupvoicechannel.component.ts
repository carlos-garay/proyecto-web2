import { Component,OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { environment } from 'src/environments/environment';
import { io } from 'socket.io-client';


@Component({
  selector: 'app-groupvoicechannel',
  templateUrl: './groupvoicechannel.component.html',
  styleUrls: ['./groupvoicechannel.component.scss']
})
export class GroupvoicechannelComponent implements OnDestroy, OnInit {
  enabled:boolean = true //si queremos que el chat este funcionando 
  socket: any; 
  listUsers:string[] = []; // aqui se van a agregar los usuarios 
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
    this.socket.on('getuserInfo',(data:any)=>{
      

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

    //llamar la funcion que actualiza
    setTimeout(()=>{
      //this.sendUserInfo()
    },3000)
  }


  ngOnDestroy(): void {
    this.enabled = false
    this.socket.emit('leaveVoice',{idChannel:this.idChannel})
    //emitir que me saquen de la lista de usuarios conectados
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
  
      madiaRecorder.addEventListener("stop", () => {
        // if(this.enabled == false){
        //   console.log('not anymore')
        //   madiaRecorder.pause
        //   madiaRecorder = new MediaRecorder(stream); //epic
        //   return;
        // } 
        var audioBlob = new Blob(audioChunks);
  
        audioChunks = [];
  
        var fileReader = new FileReader();
        fileReader.readAsDataURL(audioBlob);
        //console.log('llego aqui d')
        fileReader.onloadend = () => { //cambiando de function() a => para quedarme con el this 
          if (!this.userStatus.microphone) return; //si tiene microfono apagado no se hace nada
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
  
        //ya que se acabo una vez, resetealo 
        setTimeout(function () {
          madiaRecorder.stop();
        }, time);
      });


  
      setTimeout(function () {
        madiaRecorder.stop();
      }, time);
    });
  }

  //esta funcion va a estar dentro del setInterval 
  sendUserInfo(){
    let obj = {}
    this.socket.emit('nombre',obj)
  }

  
}
