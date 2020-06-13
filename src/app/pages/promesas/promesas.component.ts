import { Component, OnInit } from '@angular/core';
import { rejects } from 'assert';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { 

    this.contarHastaTres().then(message => console.log("termino",message))
    .catch(error => console.log("error en la promesa",error));

  }

  ngOnInit(): void {
  }

  contarHastaTres(): Promise<boolean>{

    return new Promise(( resolve,reject) => {

      let contador = 0;

      let intervalo = setInterval( () => {
        contador +=1;
        console.log("contador",contador);
        
        if(contador === 10){
          resolve(true);
          clearInterval(intervalo);
        }

      },100);

    });
  }

}
