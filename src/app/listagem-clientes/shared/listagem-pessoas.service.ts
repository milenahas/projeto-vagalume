import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Pessoas } from './pessoas';
import { UsuarioTotal } from './usuarioTotal';

@Injectable({
  providedIn: 'root'
})
export class ListagemPessoasService {

  constructor(private http: HttpClient) { }

  listaPessoas(): Observable<Pessoas>{
    return this.http.get<Pessoas>(`https://api-staging.vagalumewifi.com.br/api/tests/apiTeste`)
  }
  
  listaUsuariosTotaisSistema(): Observable<UsuarioTotal>{
    return this.http.get<UsuarioTotal>(`https://api-staging.vagalumewifi.com.br/api/tests/infoTeste`)
  }
}
