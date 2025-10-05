import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpostantDetailComponent } from './expostant-detail-component';

describe('ExpostantDetailComponent', () => {
  let component: ExpostantDetailComponent;
  let fixture: ComponentFixture<ExpostantDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpostantDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpostantDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
