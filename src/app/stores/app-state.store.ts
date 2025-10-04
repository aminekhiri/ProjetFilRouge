import { Injectable, signal, effect } from '@angular/core';
import { computed } from '@angular/core';
import { UserDto } from '../models/user-dto';

/**
 * Store pour gérer l'état global de l'application
 * Utilise le pattern Signal d'Angular pour la gestion d'état réactive
 */
@Injectable({
  providedIn: 'root'
})
export class AppStateStore {
  // États privés
  private _currentFestivalId = signal<number | null>(null);
  private _currentUser = signal<UserDto | null>(null);

  // Exposer les états en lecture seule
  public readonly currentFestivalId = this._currentFestivalId.asReadonly();
  public readonly currentUser = this._currentUser.asReadonly();

  // Propriété calculée: indique si un utilisateur est connecté
  public readonly isLoggedIn = computed(() => this._currentUser() !== null);

  // Propriété calculée: nom complet de l'utilisateur
  public readonly userName = computed(() => {
    const user = this._currentUser();
    return user ? `${user.firstname} ${user.name}` : '';
  });

  constructor() {

    // Configurer l'effet pour persister automatiquement le festival ID
    effect(() => {
      const currentId = this._currentFestivalId();
      console.log('Festival ID changed:', currentId);
      localStorage.setItem('currentFestivalId', currentId !== null ? currentId.toString() : '');
    });

    // Configurer l'effet pour persister automatiquement l'utilisateur
    effect(() => {
      const currentUser = this._currentUser();
      console.log('User changed:', currentUser);
      localStorage.setItem('currentUser', currentUser !== null ? JSON.stringify(currentUser) : '');
    });
  }

  // Méthodes à exposer par withMethods
  withMethods() {
    return {
      // Méthode pour définir le festival courant
      setFestival: (id: string | null) => {
        this._currentFestivalId.set(id !== null ? parseInt(id, 10) : null);
      },

      // Méthode pour définir l'utilisateur courant
      setUser: (user: UserDto | null) => {
        this._currentUser.set(user);
      }
    };
  }

    
  
}

