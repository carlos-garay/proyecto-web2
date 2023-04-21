import { Component, OnInit } from '@angular/core';
import { TextchannelPopulated } from 'src/app/shared/interfaces/textchannelpopulated';
import { GroupService } from 'src/app/shared/services/group.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-grouptextchannel',
  templateUrl: './grouptextchannel.component.html',
  styleUrls: ['./grouptextchannel.component.scss']
})
export class GrouptextchannelComponent implements OnInit{
  channel:TextchannelPopulated={
    _id: '',
    title: '',
    arrMembers: [],
    private:false,
    arrMessages: [] 
  }

  constructor(private groupService: GroupService, private route: ActivatedRoute){}


  ngOnInit(): void {

    //ruta angular
    //group/:idGroup/text/:idChannel
    this.route.params.subscribe(params => {
      let idChannel:string = params['idChannel']
      let idGroup:string = params['idGroup']
      this.groupService.getTextChannel(idGroup,idChannel).subscribe((response:any)=>{
        this.channel = response
      })
    })
    
    
  }
} 
