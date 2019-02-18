import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterPage } from './newsletter.page';

describe('NewsletterPage', () => {
  let component: NewsletterPage;
  let fixture: ComponentFixture<NewsletterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsletterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsletterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
