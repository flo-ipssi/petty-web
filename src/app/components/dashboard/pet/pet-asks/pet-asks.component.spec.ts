import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PetAsksComponent } from './pet-asks.component';

describe('PetAsksComponent', () => {
  let component: PetAsksComponent;
  let fixture: ComponentFixture<PetAsksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetAsksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetAsksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
