import {
  Component,
  EventEmitter,
  inject,
  Output,
  TemplateRef,
} from '@angular/core';
import { Doctor } from '../../models/doctor.model';
import { CommonModule } from '@angular/common';
import { DoctorService } from '../../services/doctor.service';
import { NgbAlertModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbAlertModule, ReactiveFormsModule],
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.scss',
})
export class DoctorListComponent {
  doctors: Doctor[] = [];
  doctorForm: FormGroup;
  selectedDoctorIndex: number | null = null;
  @Output() doctorSelected = new EventEmitter<Doctor>();
  @Output() deletedDoctor = new EventEmitter<string>();
  private modalService = inject(NgbModal);
  newDoctor = {
    name: '',
    qualification: '',
    image_url: '',
    description: '',
  };

  constructor(private doctorService: DoctorService, private fb: FormBuilder) {
    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      qualification: ['', Validators.required],
      image_url: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchDoctors();
  }

  fetchDoctors(): void {
    this.doctorService.getDoctors().subscribe(
      (data) => {
        this.doctors = data; // Populate doctors dynamically
      },
      (error) => console.error('Failed to fetch doctors:', error)
    );
  }

  selectDoctor(doctor: Doctor, index: number): void {
    console.log(doctor);
    this.selectedDoctorIndex = index;
    this.doctorSelected.emit(doctor);
  }

  addDoctor(content: TemplateRef<any>) {
    const modalRef = this.modalService.open(content, { centered: true });

    modalRef.result.then(
      () => {
        if (this.doctorForm.valid) {
          const newDoctor = this.doctorForm.value;
          this.doctors.push(newDoctor);
          this.doctorForm.reset();
        }
      },
      () => console.log('Modal dismissed')
    );
  }

  deleteDoctor(item: any) {
    if (this.doctors.filter((i) => i.name == item))
      this.doctors = this.doctors.filter((i) => i.name !== item);
    this.deletedDoctor.emit(item);
  }

  // close(alert: Alert) {
  // 	this.alerts.splice(this.alerts.indexOf(alert), 1);
  // }

  // reset() {
  // 	this.alerts = Array.from(ALERTS);
  // }
}
