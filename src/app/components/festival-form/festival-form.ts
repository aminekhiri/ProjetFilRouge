import { Component, effect, inject, input, output } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FestivalClass } from '../../models/festival-class';
import { CommonModule } from '@angular/common';
import { FestivalService } from '../../services/festival-service';



@Component({
  selector: 'app-festival-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './festival-form.html',
  styleUrl: './festival-form.scss'
})
export class FestivalForm {

  svc = inject(FestivalService);

  readonly form = new FormGroup({
    name: new FormControl('', { 
      nonNullable: true, 
      validators: [Validators.required, Validators.minLength(3)]
    }),

    location: new FormControl('', { 
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)]
    }),

    region: new FormControl('', { 
      nonNullable: true,
      validators: [Validators.required]
    }),
    
    date: new FormControl('', { 
      nonNullable: true,
      validators: [Validators.required]
    })
  });

  // Input pour recevoir un festival à éditer
  festivalToEdit = input<FestivalClass | null>(null); //pas encore utilise vraiment

  // Output qui émet un festival vers le parent
  festivalSubmit = output<{name: string, location: string, region: string, date: Date}>();

  constructor() {
    // Effect pour pré-remplir le formulaire quand un festival est reçu
    //mais pour l'instant pas utilise car pas d'edition
    effect(() => {
      const festival = this.festivalToEdit();
      if (festival) {
        this.form.patchValue({
          name: festival.name,
          location: festival.location,
          region: festival.region,
          date: festival.date.toISOString().split('T')[0] // Format pour input date
        });
      }
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
      
      // Créer un objet avec les données du festival à partir du formulaire
      const festivalData = {
        name: formValue.name || '',
        location: formValue.location || '',
        region: formValue.region || '',
        date: new Date(formValue.date || Date.now())
      };

      // Émettre les données du festival vers le composant parent
      this.festivalSubmit.emit(festivalData);
      
      // Réinitialiser le formulaire après soumission
      this.form.reset({
        name: '',
        location: '',
        region: '',
        date: ''
      });
    }
  }  
  
  
  resetList = output<void>();

  onReset(): void {
    this.resetList.emit();
  }





}
