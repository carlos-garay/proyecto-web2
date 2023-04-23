import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-generic',
  templateUrl: './generic.component.html',
  styleUrls: ['./generic.component.scss']
})
export class GenericComponent{
  title: string;
  label: string;
  buttonText: string;
  buttonFunction: () => void;
  myForm: FormGroup;
  type: string;
  placeholder:string

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<GenericComponent>, @Inject(MAT_DIALOG_DATA) public data: any ) {
    this.title = data.title;
    this.label = data.message;
    this.buttonText = data.buttonText;
    this.buttonFunction = data.buttonFunction;
    this.myForm = this.formBuilder.group({
      inputField: ['', Validators.required]
    });
    this.type = data.type;
    this.placeholder = data.placeholder
  }


  onButtonClick(): void {
    this.buttonFunction();
    this.dialogRef.close();
  }
}
