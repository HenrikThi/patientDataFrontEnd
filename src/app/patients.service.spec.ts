import {TestBed} from '@angular/core/testing';

import {PatientsService} from './patients.service';
import {HttpTestingController, HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';
import {Patient} from './model/Patient.model';

describe('PatientsService', () => {
  let service: PatientsService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let patients: Patient[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PatientsService);
    httpMock = TestBed.get(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('getPatients() should call GET for the */patients route', () => {

    // Arrange
    patients = [{id: 123, firstName: 'Henrik', lastName: 'Thiess', street: 'Saalburgweg 2', city: '61169 Friedberg'}];

    // Act
    service.getPatients().subscribe((res) => {

      // Assert - Verifies observable output
      expect(res).toEqual(patients);
    });

    // Assert - Verifies that the right URL is called
    const req = httpMock.expectOne(service.apiUrl + '/patients');

    // Assert - Verifies that the request uses GET as HTTP verb.
    expect(req.request.method).toEqual('GET');

    req.flush(patients);

    httpMock.verify();

  });
});
