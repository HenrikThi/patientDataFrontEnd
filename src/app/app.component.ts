import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {PatientsService} from './patients.service';

import {Patient} from './model/Patient.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Patient CRUD Example';
  patients: Patient[];
  selectedPatient: Patient;
  displayedColumns: string[] = ['id', 'name', 'street', 'city', 'edit', 'delete'];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private patientService: PatientsService, private snackBar: MatSnackBar, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.patientService.getPatients().subscribe(patients => {
      this.updatePatients(patients);
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateSelectedPatient(id: number): void {
    this.patientService.getPatient(id).subscribe(patient => {
      return this.selectedPatient = patient;
    }, error => console.log(error));
  }

  enablePatientAdding(): void {
    this.selectedPatient = {firstName: '', lastName: '', id: null, city: '', street: ''};
  }

  addPatient(): void {
    this.patientService.addPatient(this.selectedPatient).subscribe(patient => {
      this.patients.push(patient);
      this.updatePatients(this.patients);
    }, error => this.snackBar.open(error.error, 'close', {duration: 2000}));
  }

  updatePatient(): void {
    this.patientService.updatePatient(this.selectedPatient)
      .subscribe(patient => {
        this.updatePatientInList(patient);
        this.updatePatients(this.patients);
      }, error => this.snackBar.open(error.error, 'close', {duration: 2000}));
  }

  deletePatient(id: number): void {
    this.patientService.deletePatient(id)
      .subscribe(res => {
          this.patients = this.patients.filter(p => p.id !== id);
          this.updatePatients(this.patients);
        },
        error => console.log(error));

  }

  savePatient(): void {
    if (this.selectedPatient.id == null) {
      this.addPatient();
    } else {
      this.updatePatient();
    }
    this.selectedPatient = null;
  }

  updatePatientInList(updatedPatient: Patient): void {
    const updateItem = this.patients.find(p => p.id == updatedPatient.id);
    const index = this.patients.indexOf(updateItem);
    this.patients[index] = updatedPatient;
  }

  updatePatients(updatedPatients: Patient[]): void {
    this.patients = updatedPatients.sort((a, b) => a.lastName.localeCompare(b.lastName));
    this.dataSource = new MatTableDataSource(this.patients);
    this.dataSource.paginator = this.paginator;
    this.cdr.detectChanges();
  }
}
