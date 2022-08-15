import { Component, OnInit } from '@angular/core';
import { ListagemPessoasService } from './shared/listagem-pessoas.service';
import { Pessoas } from './shared/pessoas';
import { RetornoPessoas } from './shared/retornoPessoas';
import { UsuarioTotal } from './shared/usuarioTotal';

@Component({
  selector: 'app-listagem-pessoas',
  templateUrl: './listagem-pessoas.component.html',
  styleUrls: ['./listagem-pessoas.component.css']
})
export class ListagemPessoasComponent implements OnInit {

  pessoas: RetornoPessoas[] = [];
  pessoasSelecionadas: RetornoPessoas[] = [];

  usuariosTotal: UsuarioTotal;

  loading: boolean = false;

  datas = ['01/08/2022', '02/08/2022', '03/08/2022','04/08/2022','05/08/2022','06/08/2022','07/08/2022','08/08/2022']

  constructor(private listagemPessoasService: ListagemPessoasService) { }

  ngOnInit(): void {
    this.listarPessoas();
    this.listarUsuariosTotais();
  }

  // ******** LISTAGENS ********

  listarUsuariosTotais(){
    
    this.listagemPessoasService.listaUsuariosTotaisSistema()
    .subscribe(
      (data: UsuarioTotal) => {
        if (data){
          this.usuariosTotal = data;
        }
    })
  }

  listarPessoas(){
    this.loading = true;
    this.listagemPessoasService.listaPessoas().subscribe(
      (data: Pessoas) => {
        if (data){
          this.pessoas = data.connected;
        }
    }).add(() => {
      this.loading = false;
    })
  }

  // ******** MANIPULAÇÃO DE DADOS ********

  selecionarPessoas(){
    this.pessoasSelecionadas = [];

    this.pessoas.forEach(element => {
      for (let i = 0; i < this.datas.length; i++){
        if (element.last_connection.includes(this.datas[i])){ // Verifica se a data se enquadra dentro do período solicitado
          if (element.client_id == 'vagalume'){ // Verifica o cliente solicitado
            this.pessoasSelecionadas.push(element); // Monta um array de objetos contendo apenas os usuários que se enquadram no filtro
          }
        }
      }
    });
    this.verificarIdUnico();
  }

  verificarIdUnico(){ // Verifica todo o array de pessoasSelecionadas para confirmar se não há nenhum usuário com ID repetido
    
    let index = [];

    for (let i = 0; i < this.pessoasSelecionadas.length; i++){
      let result = this.pessoasSelecionadas.filter(y => this.pessoasSelecionadas[i].user_id == y.user_id); // Verifica os usuários que possuem ID igual
      
      if (result.length > 1){ 
        index.push(i); // Monta um array de index com a posição do objeto de todos os os usuários possuem ID igual
      }
    }

    for (let i = index.length -1; i > 0; i--){ // Mapeia de trás pra frente o array de index e remove os últimos index do array, ficando apenas o primeiro resultado encontrado
      this.pessoasSelecionadas.splice(index[i]);
    }
  }
}
