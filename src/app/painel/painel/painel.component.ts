import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { SocketService } from 'src/service/socket.service';
import { ModalPainelComponent } from '../modal-painel/modal-painel.component';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css'],
  styles: [`
    .full-screen-modal > .modal-content {
      width: 100vw;
      height: 100vh;
      top: 0;
      position: fixed;
      left: 0;
    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `]
})
export class PainelComponent implements OnInit {

  nome: String;
  modalOptions: NgbModalOptions;
  // images = [1, 2, 3].map(() => {
  //   var teste = `https://picsum.photos/900/500?random&t=${Math.random()}`;
  //   `https://picsum.photos/900/500?random&t=${Math.random()}`
  // });
  listaImagens = ['imagem01.jpg', 'imagem02.jpg', 'imagem03.jpg', 'imagem04.jpg']
  images = this.listaImagens.map((img) => {
    var teste = `../../assets/produtos/uploads/painel/${img}`;
    return `../../assets/produtos/uploads/painel/${img}`;
  });

  constructor(config: NgbCarouselConfig, private socketService: SocketService, private modalService: NgbModal) {
    // customize default values of carousels used by this component tree
    config.interval = 3500;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
    config.showNavigationArrows = false;
    config.showNavigationIndicators = false;

    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    }

  }

  open() {

    const modalRef = this.modalService.open(ModalPainelComponent, { windowClass: 'full-screen-modal' });
    modalRef.componentInstance.nome = this.nome;
    setTimeout(() => {
      modalRef.close('Close click ');
    }, 6000);
  }

  ngOnInit() {
    //tirar daqui e colocar no carrosel
    this.socketService
      .receberNome()
      .subscribe((nome: string) => {
        this.nome = nome;
        this.open();
      });

  }

}
