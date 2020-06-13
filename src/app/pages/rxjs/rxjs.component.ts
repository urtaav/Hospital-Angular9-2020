import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter} from 'rxjs/operators'
@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription : Subscription;

  constructor() { 

    this.subscription = this.returnObserver().pipe(
      // retry(2)
    ).subscribe(
      number => console.log("Subscibe",number),
      error =>console.error("error en el obs",error),
      () => console.log("termino el obs")
    );
  }


  ngOnInit(): void {
  }

  ngOnDestroy(): void{
    console.log("La pagina se va a cerrar");
    this.subscription.unsubscribe();
  }
  returnObserver(): Observable<any>{

    return new Observable( (observer: Subscriber<any>) => {
      let contador = 0;
      let intervalo = setInterval(() => {

        contador++;

        const output = {
          value: contador
        }
        observer.next(output);

        // if(contador === 3){
        //   clearInterval(intervalo);
        //   observer.complete();
        // }

        // if(contador == 2){
        //   // clearInterval(intervalo);
        //   observer.error('Upz! Hubo un error');
        // }

      },1000);
    }).pipe(
      map( resp => resp.value),
      filter( (value, index) => {
        console.log("value",value);
        console.log("index",index);
        
        if( (value % 2) === 1){
          return true;
        }else{
          return false;          
        }
      })
    )
  }
}
