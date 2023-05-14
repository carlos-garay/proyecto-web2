import { Component,OnInit,Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/shared/interfaces/user';
import { Router } from '@angular/router';
import { FriendsService } from 'src/app/shared/services/friends.service';
import { TextchannelPopulated } from 'src/app/shared/interfaces/textchannelpopulated';
import { TextchannelService } from 'src/app/shared/services/textchannel.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-friendlist',
  templateUrl: './friendlist.component.html',
  styleUrls: ['./friendlist.component.scss']
})
export class FriendlistComponent {

  arrFriends: User[] = []
  url: string = environment.apiUrl+"image/"
  constructor(private friendsService: FriendsService,private router:Router, private txtChannelService: TextchannelService ){ }

  ngOnInit(){
    this.loadFriends();
  }

  loadFriends(){
    this.friendsService.loadFriends().subscribe((response:any)=>{
      this.arrFriends=response
    })
  }

  goDirectMessage(id:string){
    this.friendsService.getDMChannel(id).subscribe((response:any)=>{
      this.txtChannelService.canalActual = response
      let url:string = '/directMessages/'+response._id
      this.router.navigate([url])
    })
  }

  removeFriend(id:string){
    this.friendsService.removeFriend(id).subscribe((response:any)=>{
      this.loadFriends()
    })
  }
  
}
