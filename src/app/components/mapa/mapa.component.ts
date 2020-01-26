import { Component, OnInit } from '@angular/core';
import { Marcador } from 'src/app/clases/marcador.class';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';  
import { MapaEditarComponent } from './mapa-editar.component';




@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {


  marcadores:Marcador[]= [];

  lat: number =-34.5686909;
  lng: number =-58.5758042;

  constructor(private _snackBar: MatSnackBar,
              public dialog: MatDialog) {
   if(localStorage.getItem('marcadores')) {
     this.marcadores = JSON.parse(localStorage.getItem('marcadores'));
   }
   }

  ngOnInit() {
  }

  agregarMarcador( evento ) {

    const coords:{lat:number, lng:number} = evento.coords;

    const nuevoMarcador = new Marcador(coords.lat, coords.lng);

    this.marcadores.push(nuevoMarcador);

    this._snackBar.open('Marcador Agregado', 'Cerrar', {duration:3000});

    this.guardarStorage();

    console.log(this.marcadores);
    // const lat = evento.coords.lat;
    // const lng = evento.coords.lng
    // const nuevoMarcador = new Marcador(lat,lng);
    // this.marcadores.push(nuevoMarcador);
    // console.log(nuevoMarcador);
    // console.log(this.marcadores);
  }

  borrarMarcador(i:number){
    this.marcadores.splice(i, 1);
    this.guardarStorage();
    this._snackBar.open('Marcador Borrado', 'Cerrar',{duration:3000});

  }

  guardarStorage(){
    localStorage.setItem('marcadores', JSON.stringify(this.marcadores))
  }

  editarMarcador(marcador: Marcador){

      const dialogRef = this.dialog.open(MapaEditarComponent, {
        width: '250px',
        data: {titulo: marcador.titulo, desc:marcador.desc}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(result);

        if (!result){
          return;
        }
        marcador.titulo = result.titulo;
        marcador.desc = result.desc;

        this.guardarStorage();
        this._snackBar.open('Marcador actualizado', 'Cerrar',{duration:3000});
        
      });
  
  }

}
