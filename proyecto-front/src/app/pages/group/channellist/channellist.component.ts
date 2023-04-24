import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Grouppopulated } from 'src/app/shared/interfaces/grouppopulated';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { GroupService } from 'src/app/shared/services/group.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { GenericComponent } from 'src/app/modals/generic/generic.component';

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
  selectedAudioChannel:string=''
  @ViewChild('menuTrigger' , { read: MatMenuTrigger }) menuTrigger!: MatMenuTrigger; 
  @ViewChild('menuTrigger2', { read: MatMenuTrigger }) menuTrigger2!: MatMenuTrigger; 
  
  
  constructor(private route: ActivatedRoute,private router:Router, private groupService:GroupService, public dialog: MatDialog) {   } 

  goTextChannel(id:string){
    let url:string = '/group/'+this.grupo._id+'/text/'+id
    this.router.navigate([url])
  }
  goVoiceChannel(id:string){
    let url:string = '/group/'+this.grupo._id+'/voice/'+id
    this.router.navigate([url])
  }

  deleteGroup(){
    this.groupService.deleteGroup(this.grupo._id).subscribe((response:any)=>{
      //mandar recargar el componente nav
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
    this.groupService.changeGroupName(this.grupo._id,name).subscribe((response:any)=>{
      //mandar recargar el componente padre
    })
  }

  addTextChannel(){
    this.groupService.addTextChannel(this.grupo._id).subscribe((response:any)=>{
      //recargar componente padre 
      //posiblemente hacer fix local 
    })
  }
  addVoiceChannel(){
    this.groupService.addVoiceChannel(this.grupo._id).subscribe((response:any)=>{
      //recargar componente padre 
      //posiblemente hacer fix local 
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
      //recargar componente padre group
    })
  }

  removeTextChannel(){
    this.groupService.removeTextChannel(this.grupo._id,this.selectedChannel).subscribe((response:any)=>{
      //recargar componente canales
    })
  }
  removeAudioChannel(){
    this.groupService.removeAudioChannel(this.grupo._id,this.selectedChannel).subscribe((response:any)=>{
      //recargar componente canales
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
      //recargar componente padre group
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
      //recargar componente padre group
    })
  }

  //MANDAR ABRIR MODALES, asignar el id del canal al que se le dio click 
  openChannelMenu(event: MouseEvent, id:string){
    console.log(id)
    event.preventDefault();
    this.selectedChannel = id;

    //abrir el mat menu
    if (event.button === 2) { // Right-click
      this.menuTrigger.openMenu();
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
