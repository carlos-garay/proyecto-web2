import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Grouppopulated } from 'src/app/shared/interfaces/grouppopulated';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { GroupService } from 'src/app/shared/services/group.service';
import { MatMenuTrigger } from '@angular/material/menu';


@Component({
  selector: 'app-channellist',
  templateUrl: './channellist.component.html',
  styleUrls: ['./channellist.component.scss']
})
export class ChannellistComponent{
  //grupo :grouppopulated


  @Input() grupo:Grouppopulated = {
    _id: '',
    title: '',
    image: '',
    arrUsers: [],
    arrAdmins: [],
    arrChannels: [],
    arrAudioChannels: []
  }

  selectedChannel:string=''
  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger; 
  
  constructor(private route: ActivatedRoute,private router:Router, private groupService:GroupService) { 
    //mientras no se puedan hacer requests se va a hardcodear para poder forjar la interfaz 
    
  } 

  goTextChannel(id:string){
    let url:string = '/group/'+this.grupo._id+'/text/'+id
    this.router.navigate([url])
  }
  goVoiceChannel(id:string){
    let url:string = '/group/'+this.grupo._id+'/voice/'+id
    this.router.navigate([url])
  }

  deleteGroup(){
    this.grupo._id
  }

  openNameDialog(){

  }
  openTextChannelDialog(){
    
  }
  openVoiceChannelDialog(){
    
  }

  addUser(){

  }

  addUserToChannel(){
    console.log('agregando al canal' + this.selectedChannel)
  }

  removeUserFromChannel(){

  }
  changeChannelName(){

  }

  //MANDAR ABRIR EL CANAL 

  openChannelMenu(event: MouseEvent, id:string){
    console.log(id)
    event.preventDefault();
    this.selectedChannel = id;

    //abrir el mat menu
    if (event.button === 2) { // Right-click
      this.menuTrigger.openMenu();
    }
  }

}
