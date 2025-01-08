import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctor.model';
import { Slot } from '../models/slot.model';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private doctorUrl = '/assets/Doctors.json';
  private slotUrl = '/assets/Slots.json';

  constructor(private http: HttpClient) {}

  // Fetch doctors list
  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.doctorUrl);
  }

  getSlots(): any {
    return this.http.get<any>(this.slotUrl);
  }
}
