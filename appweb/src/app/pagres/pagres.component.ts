import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';


@Component({
  selector: 'app-pagres',
  templateUrl: './pagres.component.html',
  styleUrls: ['./pagres.component.scss']
})
export class PagresComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];


  public barChartData: ChartDataSets[] = [
    { data: [2, 1, 3, 0, 5], label: 'Teste1' }
  ];

  private tmpData;

  constructor() { 
    this.tmpData = JSON.parse(localStorage.getItem('tempResultado'));
    this.barChartLabels = this.tmpData.opcoes;
    this.barChartData = [
      {
        data: this.tmpData.votos,
        label: this.tmpData.nome
      }
    ]
    console.log(this.tmpData)
  }

  ngOnInit() {
  }

   // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }


}
