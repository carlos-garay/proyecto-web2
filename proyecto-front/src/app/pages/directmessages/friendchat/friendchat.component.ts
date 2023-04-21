import { Component } from '@angular/core';
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
  channel:TextchannelPopulated={
    _id: '',
    title: '',
    arrMembers: [],
    private:false,
    arrMessages: [] 
  }
  constructor(private route: ActivatedRoute, private friendsService: FriendsService,private router:Router){ }
  ngOnInit(){
    console.log('salu2')

    this.route.params.subscribe(params => {
      const idFriend = params['idFriend'];
      console.log(idFriend)
      
      //no hay idGroup en DM, no se usa en el get por lo que ponemos 0 para completar la ruta
      this.friendsService.getDMChannel(idFriend).subscribe((response:any)=>{
        console.log(response)
        this.channel = response
      })
    })
  }

}
