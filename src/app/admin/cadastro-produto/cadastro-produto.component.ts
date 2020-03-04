import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalProdutosComponent } from '../modal-produtos/modal-produtos.component';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})
export class CadastroProdutoComponent implements OnInit {

  selectedFile: ImageSnippet;
  modalOptions: NgbModalOptions;

  constructor(private http: HttpClient, private modalService: NgbModal, private router: Router) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    }
  }
  file: File = null;

  processFile(imageInput: any) {
    this.file = <File>imageInput.files[0];


    const reader = new FileReader();

    // reader.addEventListener('load', (event: any) => {
    //   this.selectedFile = new ImageSnippet(event.target.result, file);
    //   // this.imageService.uploadImage(this.selectedFile.file).subscribe(
    //   //   (res) => {

    //   //   },
    //   //   (err) => {

    //   //   })
    // });

    // reader.readAsDataURL(file);
  }


  ngOnInit() {
  }

  cadastrar(formulario) {
    console.log('Cadastrar pedido: ', formulario.value);
    let { categoria, nomeProduto, descricaoProduto, valorUnitario } = formulario.value;
    let produto = {
      categoria: categoria,
      nome_produto: nomeProduto,
      descricao: descricaoProduto,
      preco_produto: valorUnitario
    };

    this.http.post(`https://api-sistema-pedidos.herokuapp.com/produto`, produto)
      .subscribe((res) => {
        console.log('Produto Cadastrado com Sucesso!!!', res);
        this.uploadImaegemProduto(res).then(
          (val) => {
            formulario.reset();
            console.log(val)
          },
          (err) => console.error(err)
        );
      });
  }

  uploadImaegemProduto = (res) => {

    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('file', this.file, this.file.name);

      console.log(res.id);

      this.http.post(`https://api-sistema-pedidos.herokuapp.com/produto/upload/${res.id}`, formData)
        .subscribe(() => {
          console.log('Produto Cadastrado com Sucesso!!!');
          resolve('done');
          this.open();
        });

    });
    // this.salvarProduto(produto);
  }

  open() {
    this.modalService.open(ModalProdutosComponent);
  }

  voltar = () => {
    this.router.navigate(['admin/menu']);
  }
}
