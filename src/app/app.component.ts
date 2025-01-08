import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { DoctorListComponent } from './components/doctor-list/doctor-list.component';
import { AppointementSlotsComponent } from './components/appointement-slots/appointement-slots.component';
import { DoctorDetailsComponent } from './components/doctor-details/doctor-details.component';
import { Doctor } from './models/doctor.model';
import { Slot } from './models/slot.model';
import { NgbAlert, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
interface Alert {
  type: string;
  message: string;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    CommonModule,
    TopBarComponent,
    DoctorListComponent,
    AppointementSlotsComponent,
    DoctorDetailsComponent,
    NgbAlertModule,
    NgbAlert,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  occupiedSlots: { [key: string]: string[] } = {};
  selectedDoctor: Doctor | null = null;
  selectedSlot: Slot | null = null;
  feedbackMessage: string = '';
  alerts: Alert[] = [];
  displayAlert = false;

  onDoctorSelected(doctor: Doctor) {
    this.selectedDoctor = doctor;
    this.selectedSlot = null; // Clear slot selection if doctor is changed
  }

  onSlotSelected(slot: Slot) {
    this.selectedSlot = slot;
  }

  bookAppointment(): void {
    if (this.selectedDoctor && this.selectedSlot) {
      this.selectedSlot.is_occupied = true;
      // Store the slot as occupied
      if (!this.occupiedSlots[this.selectedDoctor.name]) {
        this.occupiedSlots[this.selectedDoctor.name] = [];
      }
      this.occupiedSlots[this.selectedDoctor.name].push(this.selectedSlot.time);

      this.feedbackMessage = `Appointment booked with ${this.selectedDoctor.name} at ${this.selectedSlot.time}`;
      this.displayAlert = true;
      this.addAlert('success', `${this.feedbackMessage}`);

      // Reset selection
      this.resetSelection();
    }
  }

  resetSelection(): void {
    this.selectedDoctor = null;
    this.selectedSlot = null;
  }

  onDoctorDeleted(doctorName: any) {
    console.log(doctorName);
    // const message = `${doctorName} has been removed from the list.`;
    this.addAlert('danger', `Doctor ${doctorName} has been deleted.`);
    this.displayAlert = true;

    if (this.selectedDoctor?.name === doctorName) {
      this.selectedDoctor = null;
      this.selectedSlot = null;
    }
  }

  // Custom alert messages based on actions
  addAlert(type: string, message: string) {
    this.alerts.push({ type, message });

    setTimeout(() => this.close(this.alerts[0]), 5000);
  }

  // Close a specific alert
  close(alert: Alert) {
    console.log('Closing Alert:', alert); // Debugging
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  // Track alerts for better DOM performance
  trackByIndex(index: number): number {
    return index;
  }
}
