import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremioComponent } from './premio.component';

describe('PremioComponent', () => {
  let component: PremioComponent;
  let fixture: ComponentFixture<PremioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PremioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PremioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
