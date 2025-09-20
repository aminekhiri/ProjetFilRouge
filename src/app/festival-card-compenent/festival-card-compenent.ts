import { Component, input, output } from '@angular/core';
import { FestivalClass } from '../festival-class';
import { MatCardModule } from '@angular/material/card';
import { MatButton, MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-festival-card-compenent',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './festival-card-compenent.html',
  styleUrl: './festival-card-compenent.scss'
})
export class FestivalCardCompenent {
  id = input<number>();
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
