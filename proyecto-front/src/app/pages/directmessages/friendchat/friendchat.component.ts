import { Component } from '@angular/core';
import { FormBuilder, FormGroup,Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'src/app/shared/interfaces/message';
import { TextchannelPopulated } from 'src/app/shared/interfaces/textchannelpopulated';
import { FriendsService } from 'src/app/shared/services/friends.service';

@Component({
  selector: 'app-friendchat',
  templateUrl: './friendchat.component.html',
  styleUrls: ['./friendchat.component.scss']
})
export class FriendchatComponent {
  formSendDM: FormGroup;
  inputValue: string = "";
  idFriend: string = "";
  channel:TextchannelPopulated={
    _id: '',
    title: '',
    arrMembers: [],
    private:false,
    arrMessages: [] 
  }
  constructor(private formBuilder:FormBuilder,private route: ActivatedRoute, private friendsService: FriendsService,private router:Router){ 
    this.formSendDM = formBuilder.group({ 
      message:''
    })
  }

    
  ngOnInit(){
    this.route.params.subscribe(params => {
      this.idFriend = params['idFriend']
      this.loadChannel();
    })
  }

  loadChannel(){
      this.friendsService.getDMChannel(this.idFriend).subscribe((response:any)=>{
        this.channel = response
      })
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
      this.friendsService.sendDM(this.idFriend,message).subscribe((response:any)=>{
        this.inputValue=""
        this.loadChannel()
    })
  }

}
