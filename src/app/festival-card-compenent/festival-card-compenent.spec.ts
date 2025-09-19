import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FestivalCardCompenent } from './festival-card-compenent';

describe('FestivalCardCompenent', () => {
  let component: FestivalCardCompenent;
  let fixture: ComponentFixture<FestivalCardCompenent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FestivalCardCompenent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FestivalCardCompenent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
