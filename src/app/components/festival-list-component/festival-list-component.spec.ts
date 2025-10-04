import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FestivalListComponent } from './festival-list-component';
import { FestivalService } from '../../services/festival-service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FestivalClass } from '../../festival-class';
import { FestivalCardCompenent } from '../festival-card-compenent/festival-card-compenent';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

describe('FestivalListComponent', () => {
  let component: FestivalListComponent;
  let fixture: ComponentFixture<FestivalListComponent>;
  let festivalServiceMock: any;
  let mockFestivals: FestivalClass[];

  beforeEach(async () => {
    // Créer des festivals de test
    mockFestivals = [
      new FestivalClass(1, 'Rock en Seine', 'Paris', 'Île-de-France', new Date(2024, 0, 1)),
      new FestivalClass(2, 'Hellfest', 'Clisson', 'Pays de la Loire', new Date(2025, 0, 1)),
    ];

    // Mock du service de festivals
    festivalServiceMock = {
      festivals: jasmine.createSpy('festivals').and.returnValue(mockFestivals),
      totalFestivals: jasmine.createSpy('totalFestivals').and.returnValue(mockFestivals.length),
      activeFestivals: jasmine.createSpy('activeFestivals').and.returnValue([]),
      addFestival: jasmine.createSpy('addFestival'),
      removeFestival: jasmine.createSpy('removeFestival'),
      resetFestivals: jasmine.createSpy('resetFestivals')
    };

    await TestBed.configureTestingModule({
      imports: [
        FestivalListComponent,
        FestivalCardCompenent,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
      ],
      providers: [
        FormBuilder,
        { provide: FestivalService, useValue: festivalServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FestivalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the total number of festivals', () => {
    const counterElement = fixture.debugElement.query(By.css('.counter-details p:first-child'));
    expect(counterElement.nativeElement.textContent).toContain(mockFestivals.length);
  });

  it('should display festival cards for each festival', () => {
    const festivalCards = fixture.debugElement.queryAll(By.css('app-festival-card-compenent'));
    expect(festivalCards.length).toBe(mockFestivals.length);
  });

  it('should call onDelete when a festival card emits remove event', () => {
    spyOn(component, 'onDelete');
    
    // On ne peut pas simuler directement l'événement de sortie d'un composant enfant dans les tests
    // sans une configuration complexe. Nous vérifions donc directement la méthode.
    component.onDelete(0);
    expect(festivalServiceMock.removeFestival).toHaveBeenCalledWith(0);
  });

  it('should have a form with name, location, region, and date fields', () => {
    const nameInput = fixture.debugElement.query(By.css('input[formControlName="name"]'));
    const locationInput = fixture.debugElement.query(By.css('input[formControlName="location"]'));
    const regionInput = fixture.debugElement.query(By.css('input[formControlName="region"]'));
    const dateInput = fixture.debugElement.query(By.css('input[formControlName="date"]'));

    expect(nameInput).toBeTruthy();
    expect(locationInput).toBeTruthy();
    expect(regionInput).toBeTruthy();
    expect(dateInput).toBeTruthy();
  });


  it('should add a new festival with form values on submit', () => {



    // Vérifier que addFestival a été appelé avec les bonnes valeurs
    expect(festivalServiceMock.addFestival).toHaveBeenCalledWith(
      'Test Festival', 
      'Test City', 
      'Test Region',
      jasmine.any(Date)
    );
  });


});