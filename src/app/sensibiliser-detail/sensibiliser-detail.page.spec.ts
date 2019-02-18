import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensibiliserDetailPage } from './sensibiliser-detail.page';

describe('SensibiliserDetailPage', () => {
  let component: SensibiliserDetailPage;
  let fixture: ComponentFixture<SensibiliserDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensibiliserDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensibiliserDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
