
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface RailCar {
  id: string;
  carKind: string;
  aarCarKind: string;
  track: string;
  sequence: number;
  destination: string;
  length: number;
  weight: number;
  selected: boolean;
}

@Component({
  selector: 'app-planning',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './planning.html',
  styleUrls: ['./planning.scss']
})
export class PlanningComponent {
  // Active Tab State (1 = Select Train, 2 = Configure, 3 = Review & Run, 4 = Result)
  activeTab: number = 1;

  tabs = [
    { id: 1, name: '1 Select Train' },
    { id: 2, name: '2 Configure' },
    { id: 3, name: '3 Review & Run' },
    { id: 4, name: '4 Result' }
  ];

  selectTab(tabId: number) {
    this.activeTab = tabId;
  }

  // Filter Dropdown Options
  trainList = ['AZ11451', 'AZ11452', 'AZ11453'];
  trackList = ['ALL', 'S116', 'S117', 'S118'];
  destinationList = ['ALL', 'EL', 'KC', 'AKP'];
  typeList = ['ALL', 'QS3', 'PS3'];

  // Active Selections
  selectedTrain: string = 'AZ11451';
  selectedTrack: string = 'ALL';
  selectedDestination: string = 'ALL';
  selectedType: string = 'ALL';

  // Table Master Data
  allRailCars: RailCar[] = [
    { id: 'ER239600', carKind: 'QS3', aarCarKind: 'S162', track: 'S116', sequence: 1, destination: 'EL', length: 255.2, weight: 177400, selected: true },
    { id: 'KR527957', carKind: 'PS3', aarCarKind: 'S615', track: 'S116', sequence: 2, destination: 'EL', length: 76.5, weight: 50900, selected: true }
  ];

  // Getters
  get filteredRailCars(): RailCar[] {
    return this.allRailCars.filter(car => {
      const matchTrack = this.selectedTrack === 'ALL' || car.track === this.selectedTrack;
      const matchDest = this.selectedDestination === 'ALL' || car.destination === this.selectedDestination;
      const matchType = this.selectedType === 'ALL' || car.carKind === this.selectedType;
      return matchTrack && matchDest && matchType;
    });
  }

  get selectedCount(): number {
    return this.allRailCars.filter(car => car.selected).length;
  }

  get allSelected(): boolean {
    const visible = this.filteredRailCars;
    return visible.length > 0 && visible.every(car => car.selected);
  }

  // Methods
  toggleAll(event: any) {
    const isChecked = event.target.checked;
    this.filteredRailCars.forEach(car => car.selected = isChecked);
  }

  clearAll() {
    this.allRailCars.forEach(car => car.selected = false);
  }
}
new planning.ts with tab 


<div class="planning-wrapper">

  <!-- Top Tab Bar -->
  <div class="tabs-header">
    <div 
      *ngFor="let tab of tabs" 
      class="tab-item" 
      [class.active]="activeTab === tab.id"
      (click)="selectTab(tab.id)">
      {{ tab.name }}
    </div>
  </div>

  <!-- Tab Panels Container -->
  <div class="tab-content-container">

    <!-- TAB 1: Select Train -->
    <div *ngIf="activeTab === 1" class="tab-panel">
      <div class="page-title-area">
        <h2>Select Rail Car / Train</h2>
        <p>Pick a track, narrow down the railcars by track / destination / type, then add them to this plan.</p>
      </div>

      <div class="filters-card">
        <div class="filter-row">
          <div class="filter-field">
            <label>Select Train</label>
            <select [(ngModel)]="selectedTrain" class="form-select">
              <option *ngFor="let train of trainList" [value]="train">{{ train }}</option>
            </select>
          </div>
        </div>

        <div class="sub-heading">Set rail-car configuration</div>

        <div class="filter-row inline">
          <div class="filter-field">
            <label>Tracks</label>
            <select [(ngModel)]="selectedTrack" class="form-select">
              <option *ngFor="let tr of trackList" [value]="tr">{{ tr }}</option>
            </select>
          </div>
          <div class="filter-field">
            <label>Destination</label>
            <select [(ngModel)]="selectedDestination" class="form-select">
              <option *ngFor="let dest of destinationList" [value]="dest">{{ dest }}</option>
            </select>
          </div>
          <div class="filter-field">
            <label>Types</label>
            <select [(ngModel)]="selectedType" class="form-select">
              <option *ngFor="let ty of typeList" [value]="ty">{{ ty }}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="table-actions-header">
        <div class="count-label">
          Total Rail Cars Selected: <strong>{{ selectedCount }}</strong>
        </div>
        <div class="btn-group">
          <button class="btn-light" (click)="clearAll()">Clear All</button>
          <button class="btn-light">Add Rail Cars</button>
        </div>
      </div>

      <div class="table-container">
        <table class="planning-table">
          <thead>
            <tr>
              <th><input type="checkbox" [checked]="allSelected" (change)="toggleAll($event)"></th>
              <th>Rail Car #</th>
              <th>Car Kind</th>
              <th>AAR Carkind</th>
              <th>Track</th>
              <th>Sequence</th>
              <th>Destination</th>
              <th>Length</th>
              <th>Weight (lbs)</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let car of filteredRailCars">
              <td><input type="checkbox" [(ngModel)]="car.selected"></td>
              <td><strong>{{ car.id }}</strong></td>
              <td>{{ car.carKind }}</td>
              <td>{{ car.aarCarKind }}</td>
              <td>{{ car.track }}</td>
              <td>{{ car.sequence }}</td>
              <td>{{ car.destination }}</td>
              <td>{{ car.length }}</td>
              <td>{{ car.weight | number }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="panel-footer">
        <button class="btn-orange" (click)="selectTab(2)">Next: Configure &rarr;</button>
      </div>
    </div>

    <!-- TAB 2: Configure -->
    <div *ngIf="activeTab === 2" class="tab-panel placeholder-panel">
      <div class="placeholder-content">
        <h2>2. Configure</h2>
        <p>Configuration panel content will be built here.</p>
      </div>
      <div class="panel-footer">
        <button class="btn-light" (click)="selectTab(1)">&larr; Back</button>
        <button class="btn-orange" (click)="selectTab(3)">Next: Review & Run &rarr;</button>
      </div>
    </div>

    <!-- TAB 3: Review & Run -->
    <div *ngIf="activeTab === 3" class="tab-panel placeholder-panel">
      <div class="placeholder-content">
        <h2>3. Review & Run</h2>
        <p>Review & Run panel content will be built here.</p>
      </div>
      <div class="panel-footer">
        <button class="btn-light" (click)="selectTab(2)">&larr; Back</button>
        <button class="btn-orange" (click)="selectTab(4)">Next: Result &rarr;</button>
      </div>
    </div>

    <!-- TAB 4: Result -->
    <div *ngIf="activeTab === 4" class="tab-panel placeholder-panel">
      <div class="placeholder-content">
        <h2>4. Result</h2>
        <p>Results panel content will be built here.</p>
      </div>
      <div class="panel-footer">
        <button class="btn-light" (click)="selectTab(3)">&larr; Back</button>
      </div>
    </div>

  </div>

</div>


new planning.html with tabs




.planning-wrapper {
  padding: 10px;
  font-family: Arial, sans-serif;
}

/* Tab Header Styling */
.tabs-header {
  display: flex;
  gap: 40px;
  border-bottom: 2px solid #e0e0e0;
  margin-bottom: 20px;
}

.tab-item {
  padding: 10px 0;
  font-size: 14px;
  color: #777;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  margin-bottom: -2px;
  transition: all 0.2s ease;
}

.tab-item:hover {
  color: #cc3300;
}

.tab-item.active {
  color: #cc3300;
  font-weight: bold;
  border-bottom: 3px solid #cc3300; /* Active orange indicator bar */
}

/* Panel Layout */
.tab-panel {
  background: #ffffff;
  padding: 20px;
  border-radius: 4px;
  border: 1px solid #e5e5e5;
}

.placeholder-panel {
  min-height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.placeholder-content h2 {
  margin-top: 0;
  color: #333;
}

.placeholder-content p {
  color: #777;
  font-size: 13px;
}

/* Form & Table Layout */
.page-title-area h2 {
  margin: 0 0 4px 0;
  font-size: 18px;
}

.page-title-area p {
  margin: 0 0 20px 0;
  font-size: 12px;
  color: #777;
}

.filter-row {
  display: flex;
  gap: 20px;
  margin-bottom: 12px;
}

.filter-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}

.filter-field label {
  font-size: 11px;
  font-weight: bold;
  color: #666;
}

.form-select {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  font-size: 13px;
}

.sub-heading {
  font-size: 12px;
  color: #777;
  margin: 16px 0 10px 0;
}

.table-actions-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0 10px 0;
  font-size: 13px;
}

.count-label strong {
  color: #cc3300;
}

.btn-group {
  display: flex;
  gap: 10px;
}

.btn-light {
  background: #f0f0f0;
  border: 1px solid #ccc;
  padding: 6px 14px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.btn-orange {
  background: #cc3300;
  color: #fff;
  border: none;
  padding: 8px 18px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  font-weight: bold;
}

.table-container {
  overflow-x: auto;
  border: 1px solid #eee;
}

.planning-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  text-align: center;
}

.planning-table th, .planning-table td {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.planning-table th {
  background: #f8f8f8;
  color: #555;
  font-size: 11px;
}

.panel-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #eee;
}


planning.ts new code scss


import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface RailCar {
  id: string;
  carKind: string;
  aarCarKind: string;
  track: string;
  sequence: number;
  destination: string;
  length: number;
  weight: number;
  selected: boolean;
}

@Component({
  selector: 'app-planning',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent {
  // --- 1. STEPPER WIZARD STATE ---
  currentStep: number = 1;
  steps = [
    { number: 1, label: 'Select Train' },
    { number: 2, label: 'Configure' },
    { number: 3, label: 'Review & Run' },
    { number: 4, label: 'Result' }
  ];

  // --- 2. FILTER DROPDOWN OPTIONS ---
  trainList = ['AZ11451', 'AZ11452', 'AZ11453'];
  trackList = ['ALL', 'S116', 'S117', 'S118'];
  destinationList = ['ALL', 'EL', 'KC', 'AKP'];
  typeList = ['ALL', 'QS3', 'PS3'];

  // --- 3. ACTIVE FILTER SELECTIONS ---
  selectedTrain: string = 'AZ11451';
  selectedTrack: string = 'ALL';
  selectedDestination: string = 'ALL';
  selectedType: string = 'ALL';

  // --- 4. MASTER DATA (Simulated Database) ---
  allRailCars: RailCar[] = [
    { id: 'ER239600', carKind: 'QS3', aarCarKind: 'S162', track: 'S116', sequence: 1, destination: 'EL', length: 255.2, weight: 177400, selected: true },
    { id: 'KR527957', carKind: 'PS3', aarCarKind: 'S615', track: 'S116', sequence: 2, destination: 'EL', length: 76.5, weight: 50900, selected: true },
    { id: 'N467613', carKind: 'PS3', aarCarKind: 'S615', track: 'S116', sequence: 3, destination: 'EL', length: 76.5, weight: 54300, selected: false },
    { id: 'N468142', carKind: 'PS3', aarCarKind: 'S615', track: 'S117', sequence: 4, destination: 'KC', length: 76.5, weight: 54300, selected: false },
    { id: 'N646730', carKind: 'PS3', aarCarKind: 'S615', track: 'S118', sequence: 5, destination: 'AKP', length: 76.5, weight: 50800, selected: false }
  ];

  // --- 5. BUSINESS LOGIC & COMPUTED PROPERTIES ---

  // Dynamically filters table rows based on selected dropdowns
  get filteredRailCars(): RailCar[] {
    return this.allRailCars.filter(car => {
      const matchTrack = this.selectedTrack === 'ALL' || car.track === this.selectedTrack;
      const matchDest = this.selectedDestination === 'ALL' || car.destination === this.selectedDestination;
      const matchType = this.selectedType === 'ALL' || car.carKind === this.selectedType;
      return matchTrack && matchDest && matchType;
    });
  }

  // Count of currently checked rail cars
  get selectedCount(): number {
    return this.allRailCars.filter(car => car.selected).length;
  }

  // Master checkbox status
  get allSelected(): boolean {
    const visible = this.filteredRailCars;
    return visible.length > 0 && visible.every(car => car.selected);
  }

  // Master checkbox toggle
  toggleAll(event: any) {
    const isChecked = event.target.checked;
    this.filteredRailCars.forEach(car => car.selected = isChecked);
  }

  // Clear selections action
  clearAll() {
    this.allRailCars.forEach(car => car.selected = false);
  }

  // Step Navigation Logic
  setStep(stepNum: number) {
    this.currentStep = stepNum;
  }

  nextStep() {
    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
}
planning.ts

.planning-container {
  color: #333;
  font-family: Arial, sans-serif;
}

/* Stepper Bar Styling */
.stepper-bar {
  display: flex;
  background: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 20px;
}

.step-tab {
  padding: 12px 24px;
  font-size: 13px;
  color: #777;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  transition: all 0.2s ease;
}

.step-tab.active {
  color: #cc3300;
  font-weight: bold;
  border-bottom-color: #cc3300;
}

.step-num {
  margin-right: 4px;
}

/* Step Card Wrapper */
.step-card {
  background: #ffffff;
  padding: 24px;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
}

/* Headers */
.page-header h2 {
  margin: 0 0 4px 0;
  font-size: 18px;
  color: #222;
}

.page-header p {
  margin: 0 0 20px 0;
  font-size: 12px;
  color: #777;
}

/* Filters Layout */
.filters-section {
  margin-bottom: 24px;
  background: #fafafa;
  padding: 16px;
  border-radius: 4px;
  border: 1px solid #eee;
}

.filter-row {
  display: flex;
  gap: 20px;
  margin-bottom: 12px;
}

.inline-filters .filter-group {
  flex: 1;
}

.filter-group {
  display: flex;
  flex-direction: column;
}

.filter-group label {
  font-size: 11px;
  font-weight: bold;
  color: #666;
  margin-bottom: 6px;
}

.filter-subtitle {
  font-size: 12px;
  color: #888;
  margin: 12px 0 8px 0;
}

.form-control {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  font-size: 13px;
}

.select-train {
  width: 300px;
}

/* Toolbar & Actions */
.table-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.selection-count {
  font-size: 13px;
  color: #555;
}

.selection-count span {
  font-weight: bold;
  color: #cc3300;
}

.toolbar-actions {
  display: flex;
  gap: 8px;
}

.btn-secondary {
  background: #f0f0f0;
  border: 1px solid #ccc;
  padding: 6px 14px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.btn-secondary:hover {
  background: #e4e4e4;
}

/* Data Table */
.table-wrapper {
  overflow-x: auto;
  border: 1px solid #e0e0e0;
  margin-bottom: 20px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  text-align: center;
}

.data-table th {
  background: #f4f5f7;
  padding: 10px;
  border-bottom: 2px solid #ddd;
  color: #555;
  font-size: 11px;
}

.data-table td {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.bold-cell {
  font-weight: bold;
}

.no-data {
  padding: 20px;
  color: #888;
}

/* Footer Controls */
.footer-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid #eee;
}

.btn-cancel {
  background: transparent;
  border: 1px solid #ccc;
  padding: 8px 18px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.btn-primary {
  background: #cc3300;
  color: #fff;
  border: none;
  padding: 8px 18px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
}

.btn-primary:hover {
  background: #a32900;
}

.step-placeholder {
  min-height: 200px;
  padding: 20px 0;
}


planning.scss


<div class="planning-container">

  <!-- 1. Top Stepper Header Bar -->
  <div class="stepper-bar">
    <div 
      *ngFor="let step of steps" 
      class="step-tab" 
      [class.active]="currentStep === step.number"
      (click)="setStep(step.number)">
      <span class="step-num">{{ step.number }}</span> {{ step.label }}
    </div>
  </div>

  <!-- 2. Step Content Container -->
  <div class="step-card">

    <!-- STEP 1: SELECT TRAIN & RAIL CARS -->
    <div *ngIf="currentStep === 1" class="step-content">
      
      <div class="page-header">
        <h2>Select Rail Car / Train</h2>
        <p>Pick a track, narrow down the railcars by Track/Destination/Type, then add them to this plan.</p>
      </div>

      <!-- Filters Section -->
      <div class="filters-section">
        <div class="filter-row">
          <div class="filter-group select-train">
            <label>Select Train</label>
            <select [(ngModel)]="selectedTrain" class="form-control">
              <option *ngFor="let train of trainList" [value]="train">{{ train }}</option>
            </select>
          </div>
        </div>

        <div class="filter-subtitle">Set rail-car configuration</div>

        <div class="filter-row inline-filters">
          <div class="filter-group">
            <label>TRACKS</label>
            <select [(ngModel)]="selectedTrack" class="form-control">
              <option *ngFor="let t of trackList" [value]="t">{{ t }}</option>
            </select>
          </div>

          <div class="filter-group">
            <label>DESTINATION</label>
            <select [(ngModel)]="selectedDestination" class="form-control">
              <option *ngFor="let d of destinationList" [value]="d">{{ d }}</option>
            </select>
          </div>

          <div class="filter-group">
            <label>TYPES</label>
            <select [(ngModel)]="selectedType" class="form-control">
              <option *ngFor="let ty of typeList" [value]="ty">{{ ty }}</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Table Toolbar -->
      <div class="table-toolbar">
        <div class="selection-count">
          Total Rail Cars Selected: <span>{{ selectedCount }}</span>
        </div>
        <div class="toolbar-actions">
          <button class="btn-secondary" (click)="clearAll()">Clear All</button>
          <button class="btn-secondary">Add Rail Cars</button>
        </div>
      </div>

      <!-- Rail Cars Data Table -->
      <div class="table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" [checked]="allSelected" (change)="toggleAll($event)">
              </th>
              <th>Rail Car #</th>
              <th>Car Kind</th>
              <th>AAR Carkind</th>
              <th>Track</th>
              <th>Sequence</th>
              <th>Destination</th>
              <th>Length</th>
              <th>Weight (lbs)</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let car of filteredRailCars" [class.selected-row]="car.selected">
              <td>
                <input type="checkbox" [(ngModel)]="car.selected">
              </td>
              <td class="bold-cell">{{ car.id }}</td>
              <td>{{ car.carKind }}</td>
              <td>{{ car.aarCarKind }}</td>
              <td>{{ car.track }}</td>
              <td>{{ car.sequence }}</td>
              <td>{{ car.destination }}</td>
              <td>{{ car.length }}</td>
              <td>{{ car.weight | number }}</td>
            </tr>
            <tr *ngIf="filteredRailCars.length === 0">
              <td colspan="9" class="no-data">No rail cars match the selected filters.</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>

    <!-- STEP 2 PLACEHOLDER -->
    <div *ngIf="currentStep === 2" class="step-placeholder">
      <h2>2. Configuration Settings</h2>
      <p>Configure optimization limits and load balancing rules for train {{ selectedTrain }}.</p>
    </div>

    <!-- STEP 3 PLACEHOLDER -->
    <div *ngIf="currentStep === 3" class="step-placeholder">
      <h2>3. Review & Run</h2>
      <p>Review the selected {{ selectedCount }} rail cars before running the algorithm.</p>
    </div>

    <!-- STEP 4 PLACEHOLDER -->
    <div *ngIf="currentStep === 4" class="step-placeholder">
      <h2>4. Optimization Results</h2>
      <p>Optimization plan successfully calculated.</p>
    </div>

    <!-- 3. Wizard Footer Navigation -->
    <div class="footer-actions">
      <button class="btn-cancel" *ngIf="currentStep === 1">Cancel</button>
      <button class="btn-cancel" *ngIf="currentStep > 1" (click)="prevStep()">&larr; Back</button>
      <button class="btn-primary" (click)="nextStep()">
        {{ currentStep === 1 ? 'Next: Configure \u2192' : (currentStep === 4 ? 'Finish' : 'Next \u2192') }}
      </button>
    </div>

  </div>

</div>


 planning.html
 




          [type]="showPassword ? 'text' : 'password'" 
          [(ngModel)]="password" 
          name="password" 
          placeholder="Password*" 
          required />
        <i 
          class="toggle-password" 
          [ngClass]="showPassword ? 'fa-solid fa-eye' : 'fa-regular fa-eye-slash'"
          (click)="togglePasswordVisibility()">
        </i>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="submit-btn" [class.admin-btn]="isAdmin">
        Sign In as {{ isAdmin ? 'Admin' : 'User' }}
      </button>

    </form>
  </div>
</div>
login.html

.login-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 1.5rem;
}

.login-card {
  width: 100%;
  max-width: 420px;
  background: rgba(30, 41, 59, 0.75);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2.5rem 2rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
  color: #f8fafc;
}

.login-header {
  text-align: center;
  margin-bottom: 1.75rem;

  .logo-text {
    font-size: 2.25rem;
    font-weight: 800;
    letter-spacing: 2px;
    background: linear-gradient(90deg, #38bdf8, #818cf8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0 0 0.25rem 0;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
    color: #f1f5f9;
  }

  p {
    font-size: 0.875rem;
    color: #94a3b8;
    margin-top: 0.25rem;
  }
}

/* Sliding Pill Toggle */
.role-toggle-container {
  position: relative;
  display: flex;
  background: #0f172a;
  border-radius: 30px;
  padding: 4px;
  margin-bottom: 1.75rem;
  border: 1px solid rgba(255, 255, 255, 0.08);

  .role-toggle-slider {
    position: absolute;
    top: 4px;
    left: 4px;
    width: calc(50% - 4px);
    height: calc(100% - 8px);
    background: linear-gradient(135deg, #0284c7, #2563eb);
    border-radius: 26px;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s ease;

    &.admin-active {
      transform: translateX(100%);
      background: linear-gradient(135deg, #dc2626, #991b1b);
    }
  }

  .role-btn {
    position: relative;
    z-index: 1;
    flex: 1;
    background: transparent;
    border: none;
    color: #94a3b8;
    padding: 0.65rem 0;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: color 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    &.active {
      color: #ffffff;
    }
  }
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  .input-group {
    position: relative;
    display: flex;
    align-items: center;

    .icon {
      position: absolute;
      left: 14px;
      color: #64748b;
      font-size: 1.1rem;
      pointer-events: none;
      transition: color 0.2s ease;
    }

    input {
      width: 100%;
      padding: 0.85rem 2.75rem 0.85rem 2.75rem;
      background: #0f172a;
      border: 1px solid #334155;
      border-radius: 10px;
      color: #f8fafc;
      font-size: 0.95rem;
      outline: none;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;

      &::placeholder {
        color: #64748b;
      }

      &:focus {
        border-color: #38bdf8;
        box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.15);

        & ~ .icon {
          color: #38bdf8;
        }
      }
    }

    .toggle-password {
      position: absolute;
      right: 14px;
      color: #64748b;
      font-size: 1.1rem;
      cursor: pointer;
      transition: color 0.2s ease;

      &:hover {
        color: #f8fafc;
      }
    }
  }

  .submit-btn {
    margin-top: 0.5rem;
    padding: 0.85rem;
    border: none;
    border-radius: 10px;
    background: linear-gradient(135deg, #0284c7, #2563eb);
    color: #ffffff;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.35);
    }

    &:active {
      transform: translateY(0);
    }

    &.admin-btn {
      background: linear-gradient(135deg, #dc2626, #991b1b);

      &:hover {
        box-shadow: 0 4px 12px rgba(220, 38, 38, 0.35);
      }
    }
  }
}
--------login.scss

<<<<<<< HEAD
# test-project
=======
# Testproject11

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.27.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/c
