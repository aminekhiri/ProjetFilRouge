import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-festival-card-compenent',
  standalone: true,
  imports: [],
  templateUrl: './festival-card-compenent.html',
  styleUrl: './festival-card-compenent.scss'
})
export class FestivalCardCompenent {
  name = input<string>();
  location = input<string>();
  region = input<string>();
  year = input<number>();
  state = input<string>();
  
  remove = output<void>();

  onDelete() {
    this.remove.emit();
  }
}
