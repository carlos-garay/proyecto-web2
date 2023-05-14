import { Component,OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-changepicture',
  templateUrl: './changepicture.component.html',
  styleUrls: ['./changepicture.component.scss']
})
export class ChangepictureComponent {
  
  fileName: string = '';
  url: any = '';
  constructor(private userService:UserService, private sanitizer: DomSanitizer,private router:Router){}

  ngOnInit(){
    let url = environment.apiUrl+"image/"+this.userService.usuarioActual.image;
    this.url = this.sanitizer.bypassSecurityTrustUrl(url);
  }

  async onFileSelected(event:any) {
    const file:File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("file", file);
      this.userService.updateProfilePicture(formData)
      setTimeout(() => {
        this.url = environment.apiUrl+"image/"+this.userService.usuarioActual.image;
      }, 1000);

    }
  }

}
