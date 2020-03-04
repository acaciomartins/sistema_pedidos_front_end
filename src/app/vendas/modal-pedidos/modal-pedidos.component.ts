import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-pedidos',
  templateUrl: './modal-pedidos.component.html',
  styleUrls: ['./modal-pedidos.component.css']
})
export class ModalPedidosComponent implements OnInit {

  @Input() fecharModal;
  @Input() salvarPedido;
  @Input() valorTotal;
  @Input() pedido;
  @Input() aviso;
  @Input() my_modal_title;
  @Input() my_modal_content;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
  }

}
