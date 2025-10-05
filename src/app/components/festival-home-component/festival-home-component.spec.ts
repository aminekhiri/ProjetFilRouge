import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FestivalHomeComponent } from './festival-home-component';

describe('FestivalHomeComponent', () => {
  let component: FestivalHomeComponent;
  let fixture: ComponentFixture<FestivalHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FestivalHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FestivalHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
