import { Component } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-changepicture',
  templateUrl: './changepicture.component.html',
  styleUrls: ['./changepicture.component.scss']
})
export class ChangepictureComponent {
  
  fileName: string = '';
  url: any = '';
  constructor(private userService:UserService){
    this.url = userService.usuarioActual.image;
  }

  
  onFileSelected(event:any) {
    const file:File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      console.log(file.name);
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event)=>{
        this.url = reader.result;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("imgUrl",this.url);
        console.log(this.url)
        this.userService.updateProfilePicture(formData)
      }
      
      
    }
  }

}
