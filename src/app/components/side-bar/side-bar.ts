import { Component, computed } from '@angular/core';
import { inject } from '@angular/core';
import { AppStateStore } from '../../stores/app-state.store';
import { FestivalService } from '../../services/festival-service';


@Component({
  selector: 'app-side-bar',
  imports: [],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.scss'
})
export class SideBar {


  store= inject(AppStateStore);
  festivalService = inject(FestivalService);


  // Propriété calculée pour obtenir le nom du festival actuellement sélectionné
  currentFestivalName = computed(() => {
    const festivalId = this.store.currentFestivalId();
    if (festivalId === null) {
      return 'Aucun festival sélectionné';
    }else {
      //si le festival est trouvé, retourne son nom, sinon 'Festival inconnu'
      const festival = this.festivalService.festivals().find(f => f.id === festivalId);
      return festival ? festival.name : 'Festival inconnu';
    }
  });

}
