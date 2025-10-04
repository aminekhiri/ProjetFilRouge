import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { AppStateStore } from '../../stores/app-state.store';
import { FestivalService } from '../../services/festival-service';
import { FestivalClass } from '../../festival-class';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { computed } from '@angular/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let appStateStoreMock: any;
  let festivalServiceMock: any;
  let withMethodsMock: any;

  const mockFestivals = [
    new FestivalClass(1, 'Rock en Seine', 'Paris', 'Île-de-France', new Date(2024, 0, 1)),
    new FestivalClass(2, 'Hellfest', 'Clisson', 'Pays de la Loire', new Date(2025, 0, 1))
  ];

  beforeEach(async () => {
    // Mock pour withMethods
    withMethodsMock = {
      setUser: jasmine.createSpy('setUser'),
      setFestival: jasmine.createSpy('setFestival')
    };

    // Mock pour AppStateStore
    appStateStoreMock = {
      currentFestivalId: jasmine.createSpy('currentFestivalId').and.returnValue(null),
      currentUser: jasmine.createSpy('currentUser').and.returnValue(null),
      isLoggedIn: jasmine.createSpy('isLoggedIn').and.returnValue(false),
      userName: jasmine.createSpy('userName').and.returnValue(''),
      withMethods: jasmine.createSpy('withMethods').and.returnValue(withMethodsMock)
    };

    // Mock pour FestivalService
    festivalServiceMock = {
      festivals: jasmine.createSpy('festivals').and.returnValue(mockFestivals)
    };

    await TestBed.configureTestingModule({
      imports: [HeaderComponent, NoopAnimationsModule],
      providers: [
        { provide: AppStateStore, useValue: appStateStoreMock },
        { provide: FestivalService, useValue: festivalServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Aucun festival sélectionné" when no festival is selected', () => {
    appStateStoreMock.currentFestivalId.and.returnValue(null);
    fixture.detectChanges();
    
    // Forcer le calcul de la propriété calculée
    const festivalName = component.currentFestivalName();
    expect(festivalName).toBe('Aucun festival sélectionné');
  });

  it('should display festival name when festival is selected', () => {
    // Simuler un festival sélectionné
    appStateStoreMock.currentFestivalId.and.returnValue(1);
    fixture.detectChanges();
    
    // Forcer le calcul de la propriété calculée
    const festivalName = component.currentFestivalName();
    expect(festivalName).toBe('Rock en Seine');
  });

  it('should show login button when user is not logged in', () => {
    appStateStoreMock.isLoggedIn.and.returnValue(false);
    fixture.detectChanges();
    
    const loginButton = fixture.debugElement.query(By.css('button[color="accent"]'));
    expect(loginButton).toBeTruthy();
  });

  it('should call login method when login button is clicked', () => {
    appStateStoreMock.isLoggedIn.and.returnValue(false);
    fixture.detectChanges();
    
    spyOn(component, 'login');
    
    const loginButton = fixture.debugElement.query(By.css('button[color="accent"]'));
    loginButton.triggerEventHandler('click', null);
    
    expect(component.login).toHaveBeenCalled();
    expect(withMethodsMock.setUser).toHaveBeenCalled();
  });

  it('should call nextFestival when Next Festival button is clicked', () => {
    spyOn(component, 'nextFestival');
    
    const nextButton = fixture.debugElement.query(By.css('.festival-selector button'));
    nextButton.triggerEventHandler('click', null);
    
    expect(component.nextFestival).toHaveBeenCalled();
  });

  it('should select next festival in sequence', () => {
    // Configurer le test pour un festival courant
    appStateStoreMock.currentFestivalId.and.returnValue(1);
    
    // Appeler la méthode
    component.nextFestival();
    
    // Vérifier que setFestival a été appelé avec l'ID du deuxième festival
    expect(withMethodsMock.setFestival).toHaveBeenCalledWith('2');
  });

  it('should wrap around to first festival when at the end of the list', () => {
    // Configurer le test pour le dernier festival
    appStateStoreMock.currentFestivalId.and.returnValue(2);
    
    // Appeler la méthode
    component.nextFestival();
    
    // Vérifier que setFestival a été appelé avec l'ID du premier festival
    expect(withMethodsMock.setFestival).toHaveBeenCalledWith('1');
  });

  it('should select first festival when current festival is not found', () => {
    // Configurer le test pour un festival qui n'existe pas dans la liste
    appStateStoreMock.currentFestivalId.and.returnValue(999);
    
    // Appeler la méthode
    component.nextFestival();
    
    // Vérifier que setFestival a été appelé avec l'ID du premier festival
    expect(withMethodsMock.setFestival).toHaveBeenCalledWith('1');
  });
});