import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageUtilsComponent } from './message-utils.component';

describe('MessageUtilsComponent', () => {
  let component: MessageUtilsComponent;
  let fixture: ComponentFixture<MessageUtilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageUtilsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageUtilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
