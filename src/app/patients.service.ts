import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Patient} from './model/Patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
   apiUrl = 'https://patient-data-crud.herokuapp.com/api/v1';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getPatients(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/patients');
  }

  getPatient(id: number): Observable<Patient> {
    return this.http.get<Patient>(this.apiUrl + '/patients/' + id);
  }

  updatePatient(patient: Patient): Observable<any> {
    return this.http.put(this.apiUrl + '/patients/' + patient.id, patient, this.httpOptions);
  }

  addPatient(patient: Patient): Observable<any> {
    return this.http.post(this.apiUrl + '/patients', patient, this.httpOptions);
  }

  deletePatient(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/patients/' + id);
  }
}
