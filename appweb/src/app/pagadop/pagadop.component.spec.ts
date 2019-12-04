import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagadopComponent } from './pagadop.component';

describe('PagadopComponent', () => {
  let component: PagadopComponent;
  let fixture: ComponentFixture<PagadopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagadopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagadopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
