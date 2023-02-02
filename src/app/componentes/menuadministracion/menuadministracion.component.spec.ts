import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuadministracionComponent } from './menuadministracion.component';

describe('MenuadministracionComponent', () => {
  let component: MenuadministracionComponent;
  let fixture: ComponentFixture<MenuadministracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuadministracionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuadministracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
