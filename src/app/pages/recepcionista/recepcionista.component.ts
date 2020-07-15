import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-recepcionista',
  templateUrl: './recepcionista.component.html',
  styleUrls: ['./recepcionista.component.css']
})
export class RecepcionistaComponent implements OnInit {

  turnos = [];
  ids = [];

  turnoAux;

  displayModal: boolean = false;
  loading: boolean = true;

  constructor(private service: ServicioService) { }

  ngOnInit(): void {
    this.service.traerTodos("turnos").subscribe((aux) => {
      aux.forEach((response: any) => {
        let turnoInfo = response.payload.doc.data();
        let id = response.payload.doc.id;
        this.turnos.push(turnoInfo);
        this.ids.push(id);
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
}
