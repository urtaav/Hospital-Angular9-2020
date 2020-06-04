import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [],
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('inputProgress')  inputProgress: ElementRef;
  @Input('title') leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;

  @Output('updateValue') changeThisValue: EventEmitter<
    number
  > = new EventEmitter();

  constructor() {
    // console.log('Leyenda', this.leyenda);
  }

  ngOnInit(): void {
    // console.log('progreso', this.progreso);
  }
  onChange(newValue: number) {
    // console.log('newValue', newValue);

    // let elementHtml: any = document.getElementsByName('progreso')[0];
    if (newValue >= 100) {
      this.progreso = 100;
    } else if (newValue <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }

    // elementHtml.value = this.progreso;

    this.inputProgress.nativeElement.value = this.progreso;
    this.changeThisValue.emit(this.progreso);
  }

  changeValue(value: number) {

    if (this.progreso >= 1000) {
      return;
    }

    if (this.progreso <= 0) {
      return;
    }

    this.progreso = this.progreso + value;

    this.changeThisValue.emit(this.progreso);
    this.inputProgress.nativeElement.focus();
    
  }
}
