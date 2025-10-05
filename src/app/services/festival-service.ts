import { Injectable, signal, computed } from '@angular/core';
import { FestivalClass } from '../models/festival-class';

@Injectable({
  providedIn: 'root'
})
export class FestivalService {
  
  // Signal pour la liste des festivals
  private _festivals = signal<FestivalClass[]>([
    new FestivalClass(1, 'Rock en Seine', 'Paris', 'Île-de-France', new Date(2024, 0, 1)),
    new FestivalClass(2, 'Hellfest', 'Clisson', 'Pays de la Loire', new Date(2025, 0, 1)),
    new FestivalClass(3, 'Les Vieilles Charrues', 'Carhaix', 'Bretagne', new Date(2026, 0, 1)),
    new FestivalClass(4, 'Lollapalooza', 'Chicago', 'Illinois', new Date())
  ]);
  
  // Getter public pour accéder au signal
  readonly festivals = this._festivals.asReadonly();
  
  // Compteur de festivals
  public totalFestivals = computed(() => this._festivals().length);
  
  // Festivals actuels (en cours aujourd'hui)
   activeFestivals = computed(() => this._festivals().filter(f => f.isCurrent()));
  

  
  // Méthode pour ajouter un festival
  addFestival(name: string, location: string, region: string, date: Date) {
    // Trouver le plus grand ID existant et ajouter 1
    const maxId = this._festivals().length > 0 
      ? Math.max(...this._festivals().map(f => f.id)) 
      : 0;
    
    const newFestival = new FestivalClass(
      maxId + 1,
      name,
      location,
      region,
      date
    );
    this._festivals.update(festivals => [...festivals, newFestival]);
    this.saveToLocalStorage();
    return newFestival;
  }
  
  // Méthode pour supprimer un festival par index
  removeFestival(index: number) {
    this._festivals.update(festivals => 
      festivals.filter((_, i) => i !== index)
    );
    this.saveToLocalStorage();
  }
  
  // Méthode pour réinitialiser la liste des festivals
  resetFestivals() {
    this._festivals.set([]);
    this.saveToLocalStorage();
  }

  // Méthode pour récupérer un festival par son ID
  getFestivalById(id: number | null): FestivalClass | null {
    if (id === null) return null;
    return this._festivals().find(festival => festival.id === id) || null;
  }
  
  // Méthode pour sauvegarder dans localStorage
  private saveToLocalStorage() {
    localStorage.setItem('liste des festivals', JSON.stringify(this._festivals()));
  }
}
