import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { JwtHelperService } from "@auth0/angular-jwt";
import { ServicioService } from "../../services/servicio.service";

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  date: Date;
  time: Date;
  minDate: Date;
  maxDate: Date;
  es: any;

  displayModal: boolean = false;
  displayModal2: boolean = false;
  message: string = "";
  
  user: string = "";
  espec: string = "";
  especialistas: SelectItem[] = [];

  constructor(private service: ServicioService) { }

  ngOnInit(): void {
    this.service.traerTodos("especialistas").subscribe((aux) => {
      aux.forEach((response: any) => {
        let especInfo = response.payload.doc.data();
        this.especialistas.push({label: especInfo.name, value: especInfo.name});
      })
    });

    this.es = {
      firstDayOfWeek: 1,
      dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
      dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
      dayNamesMin: [ "D","L","M","X","J","V","S" ],
      monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
      monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
      today: 'Hoy',
      clear: 'Borrar'
    }
    let today = new Date();
    this.minDate  = new Date();
    this.minDate.setDate(today.getDate() + 1);
    this.maxDate = new Date();
    this.maxDate.setMonth(today.getMonth() + 2);

    const token = localStorage.getItem('token');
    const helper = new JwtHelperService();
    const payload = helper.decodeToken(token);
    let name: string = payload.name;
    let array = name.split("-");
    this.user = array[1] + " " + array[2];
  }

  public pedirTurno()
  {
    if(this.date !== undefined)
    {
      if(this.time !== undefined)
      {
        let mins = this.time.getMinutes();
        if(mins === 0 || mins === 15 || mins === 30 || mins === 45)
        {
          if(this.espec !== "")
          {
            let hora = this.time.getHours() + ":" + mins;
            if(mins === 0)
            {
              hora += "0";
            }
            let month = this.date.getMonth() + 1;
            let fecha = this.date.getDate() + "-" + month + "-" + this.date.getFullYear();
            
            if(this.service.pedirTurno(this.user,this.espec,fecha,hora))
            {
              this.displayModal2 = true;
            }
            else
            {
              this.message = "El turno ya está ocupado, intente con otro.";
              this.displayModal = true;
            }
          }
          else
          {
            this.message = "Especialista no especificado.";
            this.displayModal = true;
          }
        }
        else
        {
          this.message = "Los turnos son cada 15 minutos. Debe elegir un horario como los siguientes: xx:00, xx:15, xx:30 o xx:45.";
          this.displayModal = true;
        }
      }
      else
      {
        this.message = "Horario no especificado.";
        this.displayModal = true;
      }
    }
    else
    {
      this.message = "Fecha no especificada.";
      this.displayModal = true;
    }
  }

  public reload()
  {
    window.location.reload();
  }
}
