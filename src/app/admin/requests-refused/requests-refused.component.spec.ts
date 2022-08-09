import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsRefusedComponent } from './requests-refused.component';

describe('RequestsRefusedComponent', () => {
  let component: RequestsRefusedComponent;
  let fixture: ComponentFixture<RequestsRefusedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestsRefusedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsRefusedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
