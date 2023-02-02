import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPremioFisicoComponent } from './dialog-premio-fisico.component';

describe('DialogPremioFisicoComponent', () => {
  let component: DialogPremioFisicoComponent;
  let fixture: ComponentFixture<DialogPremioFisicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPremioFisicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogPremioFisicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
