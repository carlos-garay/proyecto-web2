import { Component } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms'
import { RequestsService } from 'src/app/shared/services/requests.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.scss']
})
export class NewRequestComponent {

  formNewRequest: FormGroup
  constructor(private formBuilder:FormBuilder,private router: Router, private requestService: RequestsService){
    this.formNewRequest = formBuilder.group({ //lleva this el formBuilder?
      email:['',Validators.required],
    })
  }

  createNewRequest(){
    //recuperar del form magico 
    let valores = this.formNewRequest.value
    let email:string = valores.email
    this.requestService.createRequest(email).subscribe((response:any)=>{

    })

  }
}
