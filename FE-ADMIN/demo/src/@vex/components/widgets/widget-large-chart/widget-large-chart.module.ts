import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetLargeChartComponent } from './widget-large-chart.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ChartModule } from '../../chart/chart.module';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [WidgetLargeChartComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    ChartModule
  ],
  exports: [WidgetLargeChartComponent]
})
export class WidgetLargeChartModule {
}
