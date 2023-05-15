import { Component,OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ShowErrorService } from 'src/app/shared/services/show-error.service';

@Component({
  selector: 'app-changepicture',
  templateUrl: './changepicture.component.html',
  styleUrls: ['./changepicture.component.scss']
})
export class ChangepictureComponent {
  
  fileName: string = '';
  url: any = '';
  constructor(private userService:UserService, private sanitizer: DomSanitizer,private router:Router, private showErrorService : ShowErrorService){}

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
      (await this.userService.updateProfilePicture(formData)).subscribe({
        next:(response:any)=>{
          this.url = environment.apiUrl+"image/"+response.imgUrl;
          this.userService.usuarioActual.image = response.imgUrl;
        },
        error: (err)=>{
          this.showErrorService.openError("Tipo de archivo no válido")
        }
      })
        
    }
  }

}
