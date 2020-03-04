import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProdutosComponent } from './admin-produtos.component';

describe('AdminProdutosComponent', () => {
  let component: AdminProdutosComponent;
  let fixture: ComponentFixture<AdminProdutosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProdutosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
