import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensibiliserPage } from './sensibiliser.page';

describe('SensibiliserPage', () => {
  let component: SensibiliserPage;
  let fixture: ComponentFixture<SensibiliserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensibiliserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensibiliserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
