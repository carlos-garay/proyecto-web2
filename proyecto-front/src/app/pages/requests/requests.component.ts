import { Component, OnInit  } from '@angular/core';
import { Request } from 'src/app/shared/interfaces/request';
import { RequestsService } from 'src/app/shared/services/requests.service';

import { MatDialog } from '@angular/material/dialog';
import { NewRequestComponent } from 'src/app/modals/new-request/new-request.component';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit{
  arrRequestsSent: Request[] = [];
  arrRequestsReceived: Request[] = [];
  constructor(private requestService: RequestsService, private matDialog:MatDialog){ }

  ngOnInit(){
    this.getAllRequests()
  }

  getAllRequests(){
    this.requestService.getRequests().subscribe((response:any)=>{
      //console.log(response)
      this.arrRequestsSent=response.ReqSent
      this.arrRequestsReceived=response.ReqReceived
      
    })
  }

  acceptRequest(id:string){
    this.requestService.acceptRequest(id).subscribe((response:any)=>{
      this.getAllRequests()
    })
  }
  declineRequest(id:string){
    this.requestService.declineRequest(id).subscribe((response:any)=>{
      this.getAllRequests()
    })
  }

  openRequestDialog(){
    this.matDialog.open(NewRequestComponent,{})
  }
}
