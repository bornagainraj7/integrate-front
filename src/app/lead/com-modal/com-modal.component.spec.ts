import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComModalComponent } from './com-modal.component';

describe('ComModalComponent', () => {
  let component: ComModalComponent;
  let fixture: ComponentFixture<ComModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
