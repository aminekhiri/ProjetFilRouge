import { Component, effect, inject, output } from '@angular/core';
import { FestivalCardCompenent } from '../festival-card-compenent/festival-card-compenent';
import { FestivalForm } from '../festival-form/festival-form';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FestivalService } from '../../services/festival-service';
import { RouterLink } from '@angular/router';
import { SideBar } from '../side-bar/side-bar';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-festival-list-component',
  standalone: true,
  imports: [FestivalCardCompenent,
    FestivalForm,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    RouterLink, 
    SideBar,
    HeaderComponent],
  templateUrl: './festival-list-component.html',
  styleUrl: './festival-list-component.scss'
})
export class FestivalListComponent {

  svc = inject(FestivalService);

  onDelete(index: number) {
    this.svc.removeFestival(index);
  }


  onResetList() {
    this.svc.resetFestivals();
  }

  


  onFestivalSubmitted(festivalData: { name: string; location: string; region: string; date: Date }) {
    this.svc.addFestival(festivalData.name, festivalData.location, festivalData.region, festivalData.date);
  }




}