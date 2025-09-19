import { Component, signal, computed } from '@angular/core';
import { FestivalCardCompenent } from '../festival-card-compenent/festival-card-compenent';

@Component({
  selector: 'app-festival-list-component',
  standalone: true,
  imports: [FestivalCardCompenent],
  templateUrl: './festival-list-component.html',
  styleUrl: './festival-list-component.scss'
})
export class FestivalListComponent {
  
    festivals = [
    { name: 'Rock en Seine', location: 'Paris', region: 'Île-de-France', year: 2024, state: 'Programmé', hidden: false },
    { name: 'Hellfest', location: 'Clisson', region: 'Pays de la Loire', year: 2025, state: 'En cours', hidden: false },
    { name: 'Les Vieilles Charrues', location: 'Carhaix', region: 'Bretagne', year: 2023, state: 'Terminé', hidden: false },
    { name: 'Lollapalooza', location: 'Chicago', region: 'Illinois', year: 2024, state: 'Programmé', hidden: false }
  ];
  
  // Compteur de festivals
  totalFestivals = signal(this.festivals.length);
  

  onDelete(index: number) {
    this.festivals[index].hidden = true;

    //on supprime l'élément du tableau et ca met a jour le tableau
    this.festivals.splice(index, 1);
    this.totalFestivals.update(() => this.festivals.length);

  }




}
