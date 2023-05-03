import { Component, OnInit} from '@angular/core';
import { Grouppopulated } from 'src/app/shared/interfaces/grouppopulated';
import {Group} from 'src/app/shared/interfaces/group';
import {Textchannel} from 'src/app/shared/interfaces/textchannel'
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { GroupService } from 'src/app/shared/services/group.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Audiochannel } from 'src/app/shared/interfaces/audiochannel';
import { User } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent{
  grupo:Grouppopulated = {
    _id: '',
    title: '',
    image: '',
    arrUsers: [],
    arrAdmins: [],
    arrChannels: [],
    arrAudioChannels: []
  }

  constructor(private route: ActivatedRoute,private router:Router, private groupService:GroupService) {}

  ngOnInit(){

    this.route.params.subscribe(params => {
      const idGrupo = params['idGroup']
      
      //esta incompleto
      this.groupService.getGroup(idGrupo).subscribe({
        next: (response:any)=>{
          this.grupo = response
        },
        error: (err: HttpErrorResponse)=>{
          if(err.status == 403){
            console.error('403 en get de grupo prueba')
          }
        }
      })
    })
  }

  receiveChannel(channel: Textchannel){
    this.grupo.arrChannels.push(channel);
  }

  removeChannel(channel: Textchannel){
    this.grupo.arrChannels =  this.grupo.arrChannels.filter(obj => obj._id != channel._id)
    let url:string = '/group/'+this.grupo._id
    this.router.navigate([url])
  }

  changeChannelName(channel: Textchannel){
    let index = this.grupo.arrChannels.findIndex(obj => obj._id == channel._id)
    //Si se encontró el indice
    if(index !=-1)
      this.grupo.arrChannels[index].title = channel.title
  }

  receiveAudioChannel(channel: Audiochannel){
    this.grupo.arrAudioChannels.push(channel);
  }

  removeAudioChannel(channel: Audiochannel){
    this.grupo.arrAudioChannels =  this.grupo.arrAudioChannels.filter(obj => obj._id != channel._id)
    let url:string = '/group/'+this.grupo._id
    this.router.navigate([url])
  }

  changeAudioChannelName(channel: Audiochannel){
    let index = this.grupo.arrAudioChannels.findIndex(obj => obj._id == channel._id)
    //Si se encontró el indice
    if(index !=-1)
      this.grupo.arrAudioChannels[index].title = channel.title
  }

  changeGroupName(group: Group){
    this.grupo.title = group.title;
  }

  addUser(user: User){
    this.grupo.arrUsers.push(user)
  }

  removeUser(user: User){
    this.grupo.arrUsers =  this.grupo.arrUsers.filter(obj => obj._id != user._id)
  }
  makeAdmin(user: any){
    let newAdmin = this.grupo.arrUsers.find(obj => obj._id == user.id)
    console.log(newAdmin);
    if(newAdmin){
      this.grupo.arrAdmins.push(newAdmin);
    }
  }

  revokeAdmin(user: any){
    this.grupo.arrAdmins =  this.grupo.arrAdmins.filter(obj => obj._id != user.id);
  }

}
