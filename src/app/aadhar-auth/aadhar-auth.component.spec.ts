import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AadharAuthComponent } from './aadhar-auth.component';

describe('AadharAuthComponent', () => {
  let component: AadharAuthComponent;
  let fixture: ComponentFixture<AadharAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AadharAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AadharAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
