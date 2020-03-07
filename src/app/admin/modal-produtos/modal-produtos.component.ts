import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-produtos',
  templateUrl: './modal-produtos.component.html',
  styleUrls: ['./modal-produtos.component.css']
})
export class ModalProdutosComponent implements OnInit {

  @Input() fecharModal;
  @Input() aviso;
  @Input() my_modal_title;
  @Input() my_modal_content;
  @Input() mensagem;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
