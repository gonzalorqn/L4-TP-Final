import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/services/servicio.service';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-especialista',
  templateUrl: './especialista.component.html',
  styleUrls: ['./especialista.component.css']
})
export class EspecialistaComponent implements OnInit {

  turnos = [];
  ids = [];
  user: string = "";
  turnoAux;
  res: string = "";

  displayModal: boolean = false;
  loading: boolean = true;

  constructor(private service: ServicioService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const helper = new JwtHelperService();
    const payload = helper.decodeToken(token);
    let name: string = payload.name;
    let array = name.split("-");
    this.user = array[1] + " " + array[2];

    this.service.traerTodos("turnos").subscribe((aux) => {
      aux.forEach((response: any) => {
        let turnoInfo = response.payload.doc.data();
        let id = response.payload.doc.id;
        let espec: string = turnoInfo.especialista;
        if(this.user === espec.toLowerCase())
        {
          this.turnos.push(turnoInfo);
          this.ids.push(id);
        }
      })
    });
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  public resenia(turno)
  {
    this.displayModal = true;
    this.turnoAux = turno;
  }

  public cargarResenia()
  {
    let index = this.turnos.indexOf(this.turnoAux);
    let reseña = this.res;
    let cliente = this.turnoAux.cliente;
    let especialista = this.turnoAux.especialista;
    let fecha = this.turnoAux.fecha;
    let hora = this.turnoAux.hora;
    if(this.turnoAux.comentario === undefined)
    {
      let data = {cliente,especialista,fecha,hora,reseña};
      this.service.actualizar("turnos",this.ids[index],data);
    }
    else
    {
      let clinica = this.turnoAux.clinica;
      let espec = this.turnoAux.espec;
      let comentario = this.turnoAux.comentario;
      let data = {cliente,especialista,fecha,hora,clinica,espec,comentario,reseña};
      this.service.actualizar("turnos",this.ids[index],data);
    }
    this.displayModal = false;

    this.loading = true;
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
}
