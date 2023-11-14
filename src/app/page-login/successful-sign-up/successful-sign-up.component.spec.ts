import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfulSignUpComponent } from './successful-sign-up.component';

describe('SuccessfulSignUpComponent', () => {
  let component: SuccessfulSignUpComponent;
  let fixture: ComponentFixture<SuccessfulSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessfulSignUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuccessfulSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
