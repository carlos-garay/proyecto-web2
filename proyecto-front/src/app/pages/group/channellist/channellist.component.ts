import { Component, OnInit } from '@angular/core';
import { Grouppopulated } from 'src/app/shared/interfaces/grouppopulated';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { GroupService } from 'src/app/shared/services/group.service';

@Component({
  selector: 'app-channellist',
  templateUrl: './channellist.component.html',
  styleUrls: ['./channellist.component.scss']
})
export class ChannellistComponent implements OnInit{
  //grupo :grouppopulated
  grupo:Grouppopulated = {
    _id: '',
    title: '',
    image: '',
    arrUsers: [],
    arrAdmins: [],
    arrChannels: [],
    arrAudioChannels: []
  }

  constructor(private route: ActivatedRoute,private router:Router, private groupService:GroupService) { 
    //mientras no se puedan hacer requests se va a hardcodear para poder forjar la interfaz 
    
  } 

  goTextChannel(id:string){
    console.log('llegue aqui')
    let url:string = '/group/'+this.grupo._id+'/text/'+id
    this.router.navigate([url])
  }
  goVoiceChannel(id:string){
    let url:string = '/group/'+this.grupo._id+'/voice/'+id
    this.router.navigate([url])
  }

  ngOnInit(){
    console.log('salu2')


    //TODO LO DE ABAJO SE ARREGLA DESPUES, POR AHORA SE USA EL HARDCODE DE ARRIBA

    //llamar al 
    //traer de la ruta el id, meterlo como parametro en la llamada al servicio de grupo 
    //asignar a this.grupo el response que salga de esa

    this.route.params.subscribe(params => {
      const idGrupo = params['idGroup'];
      console.log(idGrupo)

      //ya que tengo cargado el id puedo asignar
      //llamar al controller con el idGrupo 

      //esta incompleto
      this.groupService.getGroup(idGrupo).subscribe((response:any)=>{
        console.log(response)
        this.grupo = response
      })
    })
  }
}
