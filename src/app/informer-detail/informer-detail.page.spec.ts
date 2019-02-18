import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformerDetailPage } from './informer-detail.page';

describe('InformerDetailPage', () => {
  let component: InformerDetailPage;
  let fixture: ComponentFixture<InformerDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformerDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformerDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
