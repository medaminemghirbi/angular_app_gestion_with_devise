import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsInprogressComponent } from './requests-inprogress.component';

describe('RequestsInprogressComponent', () => {
  let component: RequestsInprogressComponent;
  let fixture: ComponentFixture<RequestsInprogressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestsInprogressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsInprogressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
