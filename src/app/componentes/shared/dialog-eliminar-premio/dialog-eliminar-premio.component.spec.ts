import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEliminarPremioComponent } from './dialog-eliminar-premio.component';

describe('DialogEliminarPremioComponent', () => {
  let component: DialogEliminarPremioComponent;
  let fixture: ComponentFixture<DialogEliminarPremioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEliminarPremioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEliminarPremioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
