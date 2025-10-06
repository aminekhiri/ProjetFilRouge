import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FestivalListComponent } from './components/festival-list-component/festival-list-component';
import { HeaderComponent } from './components/header/header.component';
import { SideBar } from './components/side-bar/side-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('festival-amine-khiri-app');
}
