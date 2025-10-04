import { Component, inject } from '@angular/core';
import { AppStateStore } from '../../stores/app-state.store';
import { FestivalService } from '../../services/festival-service';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { computed } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  // Computed property pour obtenir le nom du festival courant
  currentFestivalName = computed(() => {
    const festivalId = this.appState.currentFestivalId();
    if (festivalId === null) {
      return 'Aucun festival sélectionné';
    }
    
    const festival = this.festivalService.festivals().find(f => f.id === festivalId);
    return festival ? festival.name : 'Festival inconnu';
  });



  // Injection de dépendances
  appState = inject(AppStateStore);
  festivalService = inject(FestivalService);
  
  constructor() {
    // Sélectionner automatiquement le premier festival au chargement si aucun n'est sélectionné
    if (this.appState.currentFestivalId() === null && this.festivalService.festivals().length > 0) {
      this.nextFestival();
    }
  }

  // Méthode pour simuler une connexion utilisateur (pour test)
  login() {
    const testUser = {
      id: 1,
      firstname: 'Jean',
      name: 'Dupont',
      email: 'jean@example.com',
      password: 'jean123'
    };
    const methods = this.appState.withMethods();
    methods.setUser(testUser);
  }


  logout() {
    const methods = this.appState.withMethods();
    methods.setUser(null);
  }

  // Méthode pour sélectionner le festival suivant dans la liste (navigation cyclique)
  nextFestival() {
    const festivals = this.festivalService.festivals();
    if (festivals.length === 0) return; // Pas de festivals disponibles
    
    const currentId = this.appState.currentFestivalId();
    let nextIndex = 0; // Par défaut, on commence au premier festival
    
    if (currentId !== null) {
      // Trouver l'index actuel
      const currentIndex = festivals.findIndex(f => f.id === currentId);
      if (currentIndex !== -1) {
        // Calculer l'index suivant de manière cyclique
        nextIndex = (currentIndex + 1) % festivals.length;
      }
    }
    
    // Sélectionner le prochain festival
    const methods = this.appState.withMethods();
    methods.setFestival(festivals[nextIndex].id.toString());
  }
}