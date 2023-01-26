import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCondicionesComponent } from './dialog-condiciones.component';

describe('DialogCondicionesComponent', () => {
  let component: DialogCondicionesComponent;
  let fixture: ComponentFixture<DialogCondicionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCondicionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCondicionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
