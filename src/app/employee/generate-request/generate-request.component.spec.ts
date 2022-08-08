import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateRequestComponent } from './generate-request.component';

describe('GenerateRequestComponent', () => {
  let component: GenerateRequestComponent;
  let fixture: ComponentFixture<GenerateRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
