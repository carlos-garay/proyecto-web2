import { Component, OnInit } from '@angular/core';
import { TextchannelPopulated } from 'src/app/shared/interfaces/textchannelpopulated';
import { GroupService } from 'src/app/shared/services/group.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { ShowErrorService } from 'src/app/shared/services/show-error.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-grouptextchannel',
  templateUrl: './grouptextchannel.component.html',
  styleUrls: ['./grouptextchannel.component.scss']
})
export class GrouptextchannelComponent implements OnInit{
  formSendMessage: FormGroup;
  inputValue: string = "";
  idChannel: string = "";
  idGroup: string = "";
  channel:TextchannelPopulated={
    _id: '',
    title: '',
    arrMembers: [],
    private:false,
    arrMessages: [] 
  }

  constructor(private formBuilder:FormBuilder, private groupService: GroupService, private route: ActivatedRoute, 
    private userService: UserService, private showErrorService: ShowErrorService){
    this.formSendMessage = formBuilder.group({
      message:''
    })
  }


  ngOnInit(): void {

    //ruta angular
    //group/:idGroup/text/:idChannel
    this.route.params.subscribe(params => {
      this.idChannel = params['idChannel']
      this.idGroup = params['idGroup']
      this.loadChannel();
    })
  }

  loadChannel(){
    // this.groupService.getTextChannel(this.idGroup,this.idChannel).subscribe((response:any)=>{
    //   console.log(response)
    //   this.channel = response
    // })
    this.groupService.getTextChannel(this.idGroup,this.idChannel).subscribe({
      next:(response:any)=>{
        console.log(response)
        this.channel = response
      },
      error: (err: HttpErrorResponse)=>{
        this.showErrorService.openError(err.error)
      }
    })
  }

  

  onEnter(event: Event) {
    if(event instanceof KeyboardEvent){
      let keyEvent:KeyboardEvent = event
      if (this.inputValue.trim() !== '' && !keyEvent.shiftKey){
        this.sendMessage()
      }
    }
  }

  sendMessage(){
      let message:string = this.formSendMessage.value.message
      this.groupService.sendMessage(this.idGroup,this.idChannel,message).subscribe((response:any)=>{
        this.inputValue=""
        response.sender = this.userService.usuarioActual.name;
        this.channel.arrMessages.push(response)
    })
  }

} 
