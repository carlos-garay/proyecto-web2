import { Injectable } from '@angular/core';
import { ErrorDialogComponent } from 'src/app/modals/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ShowErrorService {

  constructor(public dialog: MatDialog) { }

  openError(error:string){
    this.dialog.open(ErrorDialogComponent, {
      data: {
        errorContent:error
      },
    })
  }
}
