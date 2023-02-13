import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMessageServiceComponent } from './dialog-message-service.component';

describe('DialogMessageServiceComponent', () => {
  let component: DialogMessageServiceComponent;
  let fixture: ComponentFixture<DialogMessageServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogMessageServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogMessageServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
