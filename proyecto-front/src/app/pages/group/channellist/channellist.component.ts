import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Grouppopulated } from 'src/app/shared/interfaces/grouppopulated';
import { TextchannelPopulated } from 'src/app/shared/interfaces/textchannelpopulated';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { GroupService } from 'src/app/shared/services/group.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { GenericComponent } from 'src/app/modals/generic/generic.component';
import { UserService } from 'src/app/shared/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/shared/interfaces/user';
import { Textchannel } from 'src/app/shared/interfaces/textchannel';
import { Audiochannel } from 'src/app/shared/interfaces/audiochannel';
import { Group } from 'src/app/shared/interfaces/group';

@Component({
  selector: 'app-channellist',
  templateUrl: './channellist.component.html',
  styleUrls: ['./channellist.component.scss']
})
export class ChannellistComponent{
  //grupo :grouppopulated
  //Eventos para canales de texto
  @Output() addChannelEvent = new EventEmitter<Textchannel>();
  @Output() removeChannelEvent = new EventEmitter<Textchannel>();
  @Output() changeChannelNameEvent = new EventEmitter<Textchannel>();

  //Eventos para canales de audio
  @Output() addAudioChannelEvent = new EventEmitter<Audiochannel>();
  @Output() removeAudioChannelEvent = new EventEmitter<Audiochannel>();
  @Output() changeAudioChannelNameEvent = new EventEmitter<Audiochannel>();

  //Eventos en botón de grupo
  @Output() changeGroupNameEvent = new EventEmitter<Group>();
  @Output() addUserEvent = new EventEmitter<User>();

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
  selectedAudioChannel:string=''
  @ViewChild('menuTrigger' , { read: MatMenuTrigger }) menuTrigger!: MatMenuTrigger; 
  @ViewChild('menuTrigger2', { read: MatMenuTrigger }) menuTrigger2!: MatMenuTrigger; 
  
  
  constructor(private route: ActivatedRoute,private router:Router, private groupService:GroupService, public dialog: MatDialog, private userService: UserService) {   } 

  goTextChannel(id:string){
    this.menuTrigger.closeMenu();
    let url:string = '/group/'+this.grupo._id+'/text/'+id
    this.router.navigate([url])
  }
  goVoiceChannel(id:string){
    this.menuTrigger2.closeMenu();
    let url:string = '/group/'+this.grupo._id+'/voice/'+id
    this.router.navigate([url])
  }

  deleteGroup(){
    this.groupService.deleteGroup(this.grupo._id).subscribe({
      next: (response:any)=>{
        let arrGroups = this.userService.usuarioActual.arrGroups
        let foundGroup = arrGroups.find(({_id}) => _id == this.grupo._id)
        if(foundGroup){
          let index = arrGroups.indexOf(foundGroup);
          arrGroups.splice(index,1);
          this.router.navigate(['/'])
        }

    },
      error: (err:HttpErrorResponse)=>{
        console.error(err);
      }
    })
  }

  openNameDialog(): void {
    const dialogRef = this.dialog.open(GenericComponent, {
      data: {
        title: 'Cambiar Nombre Grupo',//titulo modal
        label: 'Nuevo Nombre', //label de entrada
        buttonText: 'Guardar', //
        type: 'text',
        placeholder:'nuevoNombre'
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('The result was:', result);
      if(result != undefined){
        this.changeGroupName(result); 
      }
    });
  }
  changeGroupName(name:string){
    this.groupService.changeGroupName(this.grupo._id,name).subscribe({
      next: (response:any)=>{
        let arrGroups = this.userService.usuarioActual.arrGroups
        let foundGroup = arrGroups.find(({_id}) => _id == this.grupo._id)
        if(foundGroup){
          let index = arrGroups.indexOf(foundGroup);
          arrGroups[index].title = response.title
          this.changeGroupNameEvent.emit(response)
        }
      },
      error: (err:HttpErrorResponse)=>{
        console.log(err)
      }
    })
  }

  addTextChannel(){
    //Como respuesta tiene el nuevo canal creado
    this.groupService.addTextChannel(this.grupo._id).subscribe((response:any)=>{
      this.addChannelEvent.emit(response);
    })
  }
  addVoiceChannel(){
    this.groupService.addVoiceChannel(this.grupo._id).subscribe((response:any)=>{
      this.addAudioChannelEvent.emit(response);
    })
  }


  openUserDialog(): void {
    const dialogRef = this.dialog.open(GenericComponent, {
      data: {
        title: 'Agregar Usuario',//titulo modal
        label: 'correo usuario', //label de entrada
        buttonText: 'Agregar', //
        type: 'email',
        placeholder:'abc@def'
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('The result was:', result);
      if(result != undefined){
        this.addUser(result); 
      }
    });
  }
  addUser(email:string){
    //la llamada al servicio de grupo
    this.groupService.addUserToGroup(this.grupo._id,email).subscribe((response:any)=>{
      this.addUserEvent.emit(response)
    })
  }

  removeTextChannel(){
    this.groupService.removeTextChannel(this.grupo._id,this.selectedChannel).subscribe((response:any)=>{
      console.log(response);
      this.removeChannelEvent.emit(response);
    })
  }
  removeAudioChannel(){
    this.groupService.removeAudioChannel(this.grupo._id,this.selectedAudioChannel).subscribe((response:any)=>{
      this.removeAudioChannelEvent.emit(response);
    })
  }

  openAddTextUserDialog(): void {
    const dialogRef = this.dialog.open(GenericComponent, {
      data: {
        title: 'Agregar Usuario a canal texto',//titulo modal
        label: 'correo usuario', //label de entrada
        buttonText: 'Agregar', //
        type: 'email',
        placeholder:'abc@def'
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('The result was:', result);
      if(result != undefined){
        this.addUserToTextChannel(result); 
      }
    });
  }
  addUserToTextChannel(email:string){
    //la llamada al servicio de grupo
    this.groupService.addUserTextChannel(this.grupo._id, this.selectedChannel,email).subscribe((response:any)=>{
      //recargar componente padre group
    })
  }

  openAddAudioUserDialog(): void {
    const dialogRef = this.dialog.open(GenericComponent, {
      data: {
        title: 'Agregar Usuario a canal audio',//titulo modal
        label: 'correo usuario', //label de entrada
        buttonText: 'Agregar', //
        type: 'email',
        placeholder:'abc@def'
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('The result was:', result);
      if(result != undefined){
        this.addUserToAudioChannel(result); 
      }
    });
  }
  addUserToAudioChannel(email:string){
    //la llamada al servicio de grupo
    this.groupService.addUserAudioChannel(this.grupo._id, this.selectedAudioChannel,email).subscribe((response:any)=>{
      //recargar componente padre group
    })
  }

  openRemoveTextUserDialog(): void {
    const dialogRef = this.dialog.open(GenericComponent, {
      data: {
        title: 'Eliminar usuario de canal texto',//titulo modal
        label: 'correo usuario', //label de entrada
        buttonText: 'Eliminar', //
        type: 'email',
        placeholder:'abc@def'
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('The result was:', result);
      if(result != undefined){
        this.removeUserFromTextChannel(result); 
      }
    });
  }
  removeUserFromTextChannel(email:string){
    //la llamada al servicio de grupo
    this.groupService.removeUserTextChannel(this.grupo._id, this.selectedChannel,email).subscribe((response:any)=>{
      //recargar componente padre group
    })
  }

  openRemoveAudioUserDialog(): void {
    const dialogRef = this.dialog.open(GenericComponent, {
      data: {
        title: 'Eliminar Usuario de canal Audio',//titulo modal
        label: 'correo usuario', //label de entrada
        buttonText: 'Eliminar', //
        type: 'email',
        placeholder:'abc@def'
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('The result was:', result);
      if(result != undefined){
        this.removeUserFromAudioChannel(result); 
      }
    });
  }
  removeUserFromAudioChannel(email:string){
    //la llamada al servicio de grupo
    this.groupService.removeUserAudioChannel(this.grupo._id, this.selectedAudioChannel,email).subscribe((response:any)=>{
      //recargar componente padre group
    })
  }

  openChangeTextChannelName(): void {
    const dialogRef = this.dialog.open(GenericComponent, {
      data: {
        title: 'Cambiar nombre canal T',//titulo modal
        label: 'nuevo nombre', //label de entrada
        buttonText: 'Guardar', //
        type: 'text',
        placeholder:'nuevoNombre'
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('The result was:', result);
      if(result != undefined){
        this.changeTextChannelName(result); 
      }
    });
  }
  
  changeTextChannelName(name:string){
    //la llamada al servicio de grupo
    this.groupService.changeNameTextChannel(this.grupo._id,this.selectedChannel,name).subscribe((response:any)=>{
      this.changeChannelNameEvent.emit(response)
    })
  }

  openChangeAudioChannelName(): void {
    const dialogRef = this.dialog.open(GenericComponent, {
      data: {
        title: 'Cambiar nombre canal A',//titulo modal
        label: 'nuevo nombre', //label de entrada
        buttonText: 'Guardar', //
        type: 'text',
        placeholder:'nuevoNombre'
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('The result was:', result);
      if(result != undefined){
        this.changeAudioChannelName(result); 
      }
    });
  }
  changeAudioChannelName(name:string){
    //la llamada al servicio de grupo
    this.groupService.changeNameAudioChannel(this.grupo._id,this.selectedAudioChannel,name).subscribe((response:any)=>{
      this.changeAudioChannelNameEvent.emit(response)
    })
  }

  openChannelMenu(event: MouseEvent, id:string){
    console.log(id)
    event.preventDefault();
    this.selectedChannel = id;
    console.log(event.button)
    //abrir el mat menu
    if (event.button === 2) { // Right-click
      this.menuTrigger.openMenu();
    }else{
      
    }
  }
  openAudioChannel(event: MouseEvent, id:string){
    console.log('audio' + id)
    event.preventDefault();
    this.selectedAudioChannel = id;

    //abrir el mat menu
    if (event.button === 2) { // Right-click
      this.menuTrigger2.openMenu();
    }
  }
}
