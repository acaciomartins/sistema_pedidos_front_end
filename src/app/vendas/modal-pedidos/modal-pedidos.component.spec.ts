import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPedidosComponent } from './modal-pedidos.component';

describe('ModalPedidosComponent', () => {
  let component: ModalPedidosComponent;
  let fixture: ComponentFixture<ModalPedidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPedidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
