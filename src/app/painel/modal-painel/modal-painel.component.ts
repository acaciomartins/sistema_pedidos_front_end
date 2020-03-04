import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-painel',
  templateUrl: './modal-painel.component.html',
  styleUrls: ['./modal-painel.component.css'],
  styles: [`
    .full-screen-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `]
})
export class ModalPainelComponent implements OnInit {

  @Input() nome;
  @Input() fecharModal;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
  }

}
