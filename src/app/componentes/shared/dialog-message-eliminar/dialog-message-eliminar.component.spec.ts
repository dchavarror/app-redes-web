import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMessageEliminarComponent } from './dialog-message-eliminar.component';

describe('DialogMessageEliminarComponent', () => {
  let component: DialogMessageEliminarComponent;
  let fixture: ComponentFixture<DialogMessageEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogMessageEliminarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogMessageEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
