import { Component,OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/shared/interfaces/user';
import { Router } from '@angular/router';
import { FriendsService } from 'src/app/shared/services/friends.service';

@Component({
  selector: 'app-friendlist',
  templateUrl: './friendlist.component.html',
  styleUrls: ['./friendlist.component.scss']
})
export class FriendlistComponent {
  arrFriends: User[] = []
  constructor(private friendsService: FriendsService,private router:Router){ }

  ngOnInit(){
    this.loadFriends();
  }

  loadFriends(){
    this.friendsService.loadFriends().subscribe((response:any)=>{
      console.log(response)
      this.arrFriends=response
    })
  }

  goDirectMessage(id:string){
    let url:string = '/directMessages/'+id
    this.router.navigate([url])
  }

  
  removeFriend(id:string){
    this.friendsService.removeFriend(id).subscribe((response:any)=>{
      this.loadFriends()
    })
  }
}
