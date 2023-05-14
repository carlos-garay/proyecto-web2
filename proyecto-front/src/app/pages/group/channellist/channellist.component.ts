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
import { ShowErrorService } from 'src/app/shared/services/show-error.service';

import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-channellist',
  templateUrl: './channellist.component.html',
  styleUrls: ['./channellist.component.scss']
})
export class ChannellistComponent implements OnInit{
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
  
  socket :any

  ngOnInit(): void {
    this.socket = io(environment.apiUrl)
  }

  constructor(private route: ActivatedRoute,private router:Router, private groupService:GroupService, 
    public dialog: MatDialog, private userService: UserService,
    private showErrorService:ShowErrorService) {   } 

  goTextChannel(id:string){
    this.menuTrigger.closeMenu();
    let url:string = '/group/'+this.grupo._id+'/text/'+id
    this.router.navigate([url])
  }
  goVoiceChannel(id:string){
    this.menuTrigger2.closeMenu();
    let url:string = '/group/'+this.grupo._id+'/voice/'+id

    //current implementation
    // this.router.navigate([url])

    //fix para el cambio de voice chat a voice chat
    this.router.navigateByUrl('/group/'+this.grupo._id,{skipLocationChange:true})
    .then(()=>{
      this.router.navigate([url])
    })
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
        this.showErrorService.openError(err.error)
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
        this.showErrorService.openError(err.error)
      }
    })
  }

  addTextChannel(){
    //Como respuesta tiene el nuevo canal creado
    // this.groupService.addTextChannel(this.grupo._id).subscribe((response:any)=>{
    //   this.addChannelEvent.emit(response);
    // })
    this.groupService.addTextChannel(this.grupo._id).subscribe({
      next:(response:any)=>{
        this.addChannelEvent.emit(response);
      },
      error: (err: HttpErrorResponse)=>{
        this.showErrorService.openError(err.error)
      }
    })
  }
  addVoiceChannel(){
    // this.groupService.addVoiceChannel(this.grupo._id).subscribe((response:any)=>{
    //   this.addAudioChannelEvent.emit(response);
    // })
    this.groupService.addVoiceChannel(this.grupo._id).subscribe({
      next:(response:any)=>{
        this.addAudioChannelEvent.emit(response);
      },
      error: (err: HttpErrorResponse)=>{
        this.showErrorService.openError(err.error)
      }
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
    // this.groupService.addUserToGroup(this.grupo._id,email).subscribe((response:any)=>{
    //   this.addUserEvent.emit(response)
    // })
    this.groupService.addUserToGroup(this.grupo._id,email).subscribe({
      next:(response:any)=>{
        this.addUserEvent.emit(response)

        //este objeto es el que mandaremos al controlador de sockets
        let obj = {
          group:this.grupo,
          email:email
        }
        this.socket.emit('addUserToGroup',obj)

      },
      error: (err: HttpErrorResponse)=>{
        this.showErrorService.openError(err.error)
      }
    })
  }

  removeTextChannel(){
    // this.groupService.removeTextChannel(this.grupo._id,this.selectedChannel).subscribe((response:any)=>{
    //   console.log(response);
    //   this.removeChannelEvent.emit(response);
    // })
    this.groupService.removeTextChannel(this.grupo._id,this.selectedChannel).subscribe({
      next:(response:any)=>{
        this.removeChannelEvent.emit(response);
      },
      error: (err: HttpErrorResponse)=>{
        this.showErrorService.openError(err.error)
      }
    })
  }
  removeAudioChannel(){
    // this.groupService.removeAudioChannel(this.grupo._id,this.selectedAudioChannel).subscribe((response:any)=>{
    //   this.removeAudioChannelEvent.emit(response);
    // })
    this.groupService.removeAudioChannel(this.grupo._id,this.selectedAudioChannel).subscribe({
      next:(response:any)=>{
        this.removeAudioChannelEvent.emit(response);
      },
      error: (err: HttpErrorResponse)=>{
        this.showErrorService.openError(err.error)
      }
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
    // this.groupService.addUserTextChannel(this.grupo._id, this.selectedChannel,email).subscribe((response:any)=>{
      
    // })
    this.groupService.addUserTextChannel(this.grupo._id, this.selectedChannel,email).subscribe({
      next:(response:any)=>{
        
      },
      error: (err: HttpErrorResponse)=>{
        this.showErrorService.openError(err.error)
      }
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
    // this.groupService.addUserAudioChannel(this.grupo._id, this.selectedAudioChannel,email).subscribe((response:any)=>{
      
    // })
    this.groupService.addUserAudioChannel(this.grupo._id, this.selectedAudioChannel,email).subscribe({
      next:(response:any)=>{
        
      },
      error: (err: HttpErrorResponse)=>{
        this.showErrorService.openError(err.error)
      }
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
    // this.groupService.removeUserTextChannel(this.grupo._id, this.selectedChannel,email).subscribe((response:any)=>{
      
    // })
    this.groupService.removeUserTextChannel(this.grupo._id, this.selectedChannel,email).subscribe({
      next:(response:any)=>{
        
      },
      error: (err: HttpErrorResponse)=>{
        this.showErrorService.openError(err.error)
      }
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
    // this.groupService.removeUserAudioChannel(this.grupo._id, this.selectedAudioChannel,email).subscribe((response:any)=>{
      
    // })
    this.groupService.removeUserAudioChannel(this.grupo._id, this.selectedAudioChannel,email).subscribe({
      next:(response:any)=>{
        
      },
      error: (err: HttpErrorResponse)=>{
        this.showErrorService.openError(err.error)
      }
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
    // this.groupService.changeNameTextChannel(this.grupo._id,this.selectedChannel,name).subscribe((response:any)=>{
    //   this.changeChannelNameEvent.emit(response)
    // })
    this.groupService.changeNameTextChannel(this.grupo._id,this.selectedChannel,name).subscribe({
      next:(response:any)=>{
        this.changeChannelNameEvent.emit(response)
      },
      error: (err: HttpErrorResponse)=>{
        this.showErrorService.openError(err.error)
      }
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
    // this.groupService.changeNameAudioChannel(this.grupo._id,this.selectedAudioChannel,name).subscribe((response:any)=>{
    //   this.changeAudioChannelNameEvent.emit(response)
    // })
    this.groupService.changeNameAudioChannel(this.grupo._id,this.selectedAudioChannel,name).subscribe({
      next:(response:any)=>{
        this.changeAudioChannelNameEvent.emit(response)
      },
      error: (err: HttpErrorResponse)=>{
        this.showErrorService.openError(err.error)
      }
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
