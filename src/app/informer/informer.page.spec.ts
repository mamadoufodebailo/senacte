import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformerPage } from './informer.page';

describe('InformerPage', () => {
  let component: InformerPage;
  let fixture: ComponentFixture<InformerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
