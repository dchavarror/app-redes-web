import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGanadorComponent } from './dialog-ganador.component';

describe('DialogGanadorComponent', () => {
  let component: DialogGanadorComponent;
  let fixture: ComponentFixture<DialogGanadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogGanadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogGanadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
