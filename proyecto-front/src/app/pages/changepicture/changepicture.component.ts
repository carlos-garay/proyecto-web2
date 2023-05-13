import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-changepicture',
  templateUrl: './changepicture.component.html',
  styleUrls: ['./changepicture.component.scss']
})
export class ChangepictureComponent {
  
  fileName: string = '';
  constructor(private userService:UserService, private sanitizer: DomSanitizer){

  }
  onFileSelected(event:any) {
    const file:File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      console.log(file.name);
      let url = this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(file)
      )
      const formData = new FormData();
      formData.append("file", file);
      console.log("La url")
      console.log(url);
      
      this.userService.updateProfilePicture(formData, url)
    }
  }

}
