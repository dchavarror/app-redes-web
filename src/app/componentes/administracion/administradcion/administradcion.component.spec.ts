import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradcionComponent } from './administradcion.component';

describe('AdministradcionComponent', () => {
  let component: AdministradcionComponent;
  let fixture: ComponentFixture<AdministradcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradcionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministradcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
