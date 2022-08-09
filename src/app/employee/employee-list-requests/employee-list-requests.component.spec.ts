import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListRequestsComponent } from './employee-list-requests.component';

describe('EmployeeListRequestsComponent', () => {
  let component: EmployeeListRequestsComponent;
  let fixture: ComponentFixture<EmployeeListRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeListRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeListRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
