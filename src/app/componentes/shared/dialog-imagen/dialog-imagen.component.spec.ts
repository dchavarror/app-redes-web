import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogImagenComponent } from './dialog-imagen.component';

describe('DialogImagenComponent', () => {
  let component: DialogImagenComponent;
  let fixture: ComponentFixture<DialogImagenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogImagenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogImagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
