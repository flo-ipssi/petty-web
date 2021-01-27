import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetsCardsComponent } from './pets-cards.component';

describe('PetsCardsComponent', () => {
  let component: PetsCardsComponent;
  let fixture: ComponentFixture<PetsCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetsCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetsCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
