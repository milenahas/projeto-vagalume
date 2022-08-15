import { TestBed } from '@angular/core/testing';

import { ListagemPessoasService } from './listagem-pessoas.service';

describe('ListagemClientesService', () => {
  let service: ListagemPessoasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListagemPessoasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
