import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlerterPage } from './alerter.page';

describe('AlerterPage', () => {
  let component: AlerterPage;
  let fixture: ComponentFixture<AlerterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlerterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlerterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
