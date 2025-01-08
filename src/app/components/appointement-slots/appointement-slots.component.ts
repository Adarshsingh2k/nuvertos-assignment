import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Slot } from '../../models/slot.model';
import { DoctorService } from '../../services/doctor.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointement-slots',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointement-slots.component.html',
  styleUrl: './appointement-slots.component.scss',
})
export class AppointementSlotsComponent implements OnInit {
  @Input() occupiedSlots: string[] = [];
  @Output() slotSelected = new EventEmitter<Slot>();

  morningSlots: Slot[] = [];
  afternoonSlots: Slot[] = [];
  eveningSlots: Slot[] = [];
  selectedSlot: Slot | null = null;

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.doctorService.getSlots().subscribe((data: any) => {
      this.morningSlots = this.markOccupiedSlots(data.morning.slots);
      this.afternoonSlots = this.markOccupiedSlots(data.afternoon.slots);
      this.eveningSlots = this.markOccupiedSlots(data.evening.slots);
    });
  }

  selectSlot(slot: Slot): void {
    if (!slot.is_occupied) {
      this.clearSelection();
      slot.is_selected = true;

      this.selectedSlot = slot;
      this.slotSelected.emit(slot);
    }
  }

  clearSelection(): void {
    [
      ...this.morningSlots,
      ...this.afternoonSlots,
      ...this.eveningSlots,
    ].forEach((slot) => (slot.is_selected = false));
  }

  markOccupiedSlots(slots: Slot[]): Slot[] {
    return slots.map((slot) => ({
      ...slot,
      is_occupied: this.occupiedSlots.includes(slot.time) || slot.is_occupied,
    }));
  }
}
