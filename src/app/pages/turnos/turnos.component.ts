import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/services/servicio.service';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {

  turnos = [];
  ids = [];
  user: string = "";
  turnoAux;

  displayModal: boolean = false;
  displayModal2: boolean = false;
  displayModal3: boolean = false;
  message: string = "";
  loading: boolean = true;

  clin: number;
  esp: number;
  com: string = "";

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
        if(this.user === turnoInfo.cliente)
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

  public confirmacion(turno)
  {
    this.displayModal = true;
    this.turnoAux = turno;
  }

  public eliminar()
  {
    let index = this.turnos.indexOf(this.turnoAux);
    this.service.eliminar("turnos",this.ids[index]);
    this.loading = true;
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  public encuesta(turno)
  {
    this.displayModal2 = true;
    this.turnoAux = turno;
  }

  public cargarEncuesta()
  {
    let index = this.turnos.indexOf(this.turnoAux);
    let clinica = this.clin;
    let espec = this.esp;
    let comentario = this.com;
    let cliente = this.turnoAux.cliente;
    let especialista = this.turnoAux.especialista;
    let fecha = this.turnoAux.fecha;
    let hora = this.turnoAux.hora;
    if(this.turnoAux.reseña === undefined)
    {
      let data = {cliente,especialista,fecha,hora,clinica,espec,comentario};
      this.service.actualizar("turnos",this.ids[index],data);
    }
    else
    {
      let reseña = this.turnoAux.reseña;
      let data = {cliente,especialista,fecha,hora,clinica,espec,comentario,reseña};
      this.service.actualizar("turnos",this.ids[index],data);
    }
    this.displayModal2 = false;

    this.loading = true;
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  public verResenia(turno)
  {
    this.displayModal3 = true;
    if(turno.reseña === undefined)
    {
      this.message = "Lo sentimos, el especialista aun no ha cargado la reseña de los trabajos realizados.";
    }
    else
    {
      this.message = turno.reseña;
    }
  }
}
