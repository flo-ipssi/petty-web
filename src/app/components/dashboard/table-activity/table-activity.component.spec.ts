import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableActivityComponent } from './table-activity.component';

describe('TableActivityComponent', () => {
  let component: TableActivityComponent;
  let fixture: ComponentFixture<TableActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
