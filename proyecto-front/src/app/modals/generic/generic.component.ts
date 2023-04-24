import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-generic',
  templateUrl: './generic.component.html',
  styleUrls: ['./generic.component.scss']
})
export class GenericComponent{
  title: string; //parametro
  label: string = 'default';//parametro
  buttonText: string;//parametro
  type: string;//parametro
  placeholder:string//parametro
  myForm: FormGroup;
  

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<GenericComponent>, @Inject(MAT_DIALOG_DATA) public data: any ) {
    this.title = data.title;
    this.label = data.label;
    this.buttonText = data.buttonText;
    this.type = data.type;
    this.placeholder = data.placeholder;

    this.myForm = this.formBuilder.group({
      inputField: ['', Validators.required]
    });

  }


  onButtonClick(): void {
    this.dialogRef.close(this.myForm.value.inputField);
  }
}
