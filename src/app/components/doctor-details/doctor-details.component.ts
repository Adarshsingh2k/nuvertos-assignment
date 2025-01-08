import { Component, Input } from '@angular/core';
import { Doctor } from '../../models/doctor.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctor-details.component.html',
  styleUrl: './doctor-details.component.scss',
})
export class DoctorDetailsComponent {
  @Input() doctor!: Doctor;
}
