import { Injectable } from '@angular/core';
import { AngularFirestore , AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(private fire: AngularFirestore) { }

  public crear( collection : string, data : any){
    return this.fire.collection(collection).add(data);
  }

  public traerTodos( collection : string){
    return this.fire.collection(collection).snapshotChanges();
  }

  public eliminar( collection : string, id : string){
    return this.fire.collection(collection).doc(id).delete();
  }

  public actualizar( collection : string, id : string, data : any){
    return this.fire.collection(collection).doc(id).set(data);
  }

  public pedirTurno(cliente: string, especialista: string, fecha: string, hora: string)
  {
    let flag = true;
    let array = [];
    this.traerTodos("turnos").subscribe((aux) => {
      aux.forEach((response: any) => {
        let turnoInfo = response.payload.doc.data();
        array.push(turnoInfo);        
      })
    });

    //console.log(array);
    //array.forEach(element => {
      //console.log(element);
      //console.log(element.especialista);
      //if(element.especialista === especialista && element.fecha === fecha && element.hora === hora)
        //{
          //flag = false;
          //console.log(element.especialista);
        //}
    //});
    
    if(flag)
    {
      let data = {cliente,especialista,hora,fecha};
      this.crear("turnos/", data);
      return true;
    }
    else
    {
      return false;
    }
  }
}
