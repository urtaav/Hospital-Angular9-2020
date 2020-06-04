import { Component, OnInit,Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-grafica-dona',
  templateUrl: './grafica-dona.component.html',
  styleUrls: ['./grafica-dona.component.css']
})
export class GraficaDonaComponent implements OnInit {

      // Doughnut
      @Input() doughnutChartLabels: string[] = [];
      @Input() doughnutChartData: number [] =[];
      @Input() doughnutChartType: string= '' ;

  constructor() { }

  ngOnInit(): void {
  }

}
