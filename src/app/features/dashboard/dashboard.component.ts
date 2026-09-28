import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule], // Required for *ngFor in the table
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  // Placeholder stats data
  totalUnits = 2190;
  availableForLoading = 1558;
  unitsOnHold = 632;

  // Placeholder table data for "Containers by Destination & Car Kind"
  tableData = [
    { destination: 'ADN PQ', kc1: 9, kc2: 0, kc4: 11, kc5: 0, kc7: 0, kf4: 0, total: 20 },
    { destination: 'ADO PQ', kc1: 6, kc2: 10, kc4: 335, kc5: 6, kc7: 148, kf4: 77, total: 652 },
    { destination: 'ADQ PQ', kc1: 0, kc2: 0, kc4: 2, kc5: 0, kc7: 0, kf4: 0, total: 2 },
    { destination: 'ADR PQ', kc1: 4, kc2: 0, kc4: 7, kc5: 0, kc7: 0, kf4: 0, total: 14 },
    { destination: 'AKP BC', kc1: 0, kc2: 0, kc4: 117, kc5: 0, kc7: 1, kf4: 0, total: 118 }
  ];
}