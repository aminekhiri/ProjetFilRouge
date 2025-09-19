import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FestivalListComponent } from './festival-list-component/festival-list-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FestivalListComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('festival-amine-khiri-app');
}
