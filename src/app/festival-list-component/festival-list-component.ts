import { Component, signal, computed, effect } from '@angular/core';
import { FestivalCardCompenent } from '../festival-card-compenent/festival-card-compenent';
import { FestivalClass } from '../festival-class';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-festival-list-component',
  standalone: true,
  imports: [FestivalCardCompenent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule],
  templateUrl: './festival-list-component.html',
  styleUrl: './festival-list-component.scss'
})
export class FestivalListComponent {
  
  festivals = [
    new FestivalClass(1, 'Rock en Seine', 'Paris', 'Île-de-France', 2024, false),
    new FestivalClass(2, 'Hellfest', 'Clisson', 'Pays de la Loire', 2025, false),
    new FestivalClass(3, 'Les Vieilles Charrues', 'Carhaix', 'Bretagne', 2026, false),
    new FestivalClass(4, 'Lollapalooza', 'Chicago', 'Illinois', 2024, false)
  ];
  
  // Compteur de festivals
  totalFestivals = signal(this.festivals.length);
  

  onDelete(index: number) {
    this.festivals[index].hidden = true;

    //on supprime l'élément du tableau et ca met a jour le tableau
    this.festivals.splice(index, 1);
    this.totalFestivals.update(() => this.festivals.length);

  }


  addFestival(name:string, location:string, region:string, year:number) {
    const newFestival = new FestivalClass(
      this.festivals.length + 1,
      name,
      location,
      region,
      year,
      false
    );
    this.festivals.push(newFestival);
    this.totalFestivals.update(() => this.festivals.length);
  }

    // Formulaire réactif
  festivalForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.festivalForm = this.fb.group({
      name: [''],
      location: [''],
      region: [''],
      year: ['']
    });

    effect(() => {
      console.log('Total festivals:', this.totalFestivals());
      console.log('Active festivals:', this.activeFestivals());
      localStorage.setItem('liste des festivals',JSON.stringify(this.festivals));
    });
  }

    onSubmit() {
    const formValue = this.festivalForm.value;
    this.addFestival(formValue.name, formValue.location, formValue.region, formValue.year);
    this.festivalForm.reset();
  }
  
  onReset() {
    this.festivals = [];
    this.totalFestivals.set(0);
  }


  activeFestivals = computed(() => this.totalFestivals() - this.festivals.filter(f => f.getState() === 'Terminé' || f.getState() === 'Programmé').length);



}