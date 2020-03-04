import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPainelComponent } from './modal-painel.component';

describe('ModalPainelComponent', () => {
  let component: ModalPainelComponent;
  let fixture: ComponentFixture<ModalPainelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPainelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPainelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
