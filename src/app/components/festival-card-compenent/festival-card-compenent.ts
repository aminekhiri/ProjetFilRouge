import { Component, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { FestivalClass } from '../../models/festival-class';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-festival-card-compenent',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, DatePipe],
  templateUrl: './festival-card-compenent.html',
  styleUrl: './festival-card-compenent.scss'
})
export class FestivalCardCompenent {
  id = input<number>();
  name = input<string>();
  location = input<string>();
  region = input<string>();
  date = input<Date>();
  state = input<string>();
  isCurrent = input<boolean>(false); // ← Ajouter cette ligne
  
  remove = output<void>();

  onDelete() {
    this.remove.emit();
  }
}
