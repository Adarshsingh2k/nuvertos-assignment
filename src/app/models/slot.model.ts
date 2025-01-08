export interface Slot {
  time: string;
  is_selected: boolean;
  is_occupied: boolean;
  period: string; // Added period field for morning, afternoon, evening
}
