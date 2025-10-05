import { Component, inject, input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { AsyncPipe , DatePipe, Location} from '@angular/common';
import { F } from '@angular/cdk/keycodes';
import { FestivalService } from '../../services/festival-service';

@Component({
  selector: 'app-expostant-detail-component',
  imports: [AsyncPipe, DatePipe],
  templateUrl: './expostant-detail-component.html',
  styleUrl: './expostant-detail-component.scss'
})
export class ExpostantDetailComponent {

  location = inject(Location);
  router = inject(Router);

  // goToExposant(id:number){
  //   this.router.navigate(['/exposants', id]);
  // }

  route = inject(ActivatedRoute);
   id$ = this.route.paramMap.pipe(map(params => params.get('id')));

   //on va mettre en input les informations de l'exposant

  //  name = input<string>();
  //  location = input<string>();
  //  region = input<string>();
  //  date = input<Date>();


   svc = inject(FestivalService);

   //on va chercher le festival par son id dans la liste des festivals du service
   festival$ = this.id$.pipe(
    map(id => {
      const festivalId = id ? parseInt(id, 10) : null; //parseInt(id,10) pour convertir en number et base 10
      return this.svc.getFestivalById(festivalId);
    })
   );

   goBack() { 
    if (window.history.length > 1) {
      //fonction pour revenir a la liste des exposants
      this.location.back();
    } else {
      // Si l'historique ne permet pas de revenir en arrière, rediriger vers la liste
      this.router.navigate(['/exposants']);
    }
   }

}
