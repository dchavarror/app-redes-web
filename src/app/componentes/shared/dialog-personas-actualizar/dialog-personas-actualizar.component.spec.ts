import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPersonasActualizarComponent } from './dialog-personas-actualizar.component';

describe('DialogPersonasActualizarComponent', () => {
  let component: DialogPersonasActualizarComponent;
  let fixture: ComponentFixture<DialogPersonasActualizarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPersonasActualizarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogPersonasActualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
