import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetCardItemComponent } from './pet-card-item.component';

describe('PetCardItemComponent', () => {
  let component: PetCardItemComponent;
  let fixture: ComponentFixture<PetCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetCardItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
