import { FatoService } from './../../services/fato.service';
import { SistemaService } from './../../services/sistema.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent implements OnInit {

  sistemas: any = [];
  idSistemaSelecionado: Number = 0;
  fatos: any = [];
  respostas: any = []
  respostaFinal: String = "";
  idsRepetidos: Number[] = [];

  constructor(private sistemaService : SistemaService, private fatosService: FatoService) { }

  ngOnInit(): void {
    this.sistemaService.get().subscribe(sistemas => {
      this.sistemas = sistemas
    });  
  }

  carregarFatos() {
    this.idsRepetidos = [];
    this.respostaFinal = "";
    this.respostas = [];
    this.fatosService.getByIdSistema(this.idSistemaSelecionado).subscribe(fatos => {
      this.fatos = fatos;
    });
  }

  afterAnswer(resposta: String, fato: any) {
    
    // Sistema para bloquear duas respostas
    for (let i = 0; i < this.idsRepetidos.length; i++) {
      if(fato.id == this.idsRepetidos[i]) {
        return this.sistemaService.messageDanger("A resposta dessa pergunta já foi computada.");
      }
    }
    this.idsRepetidos.push(fato.id);
    console.log(this.fatos.length, this.respostas.length);

    this.respostas.push(resposta);

    if(this.respostas.length == this.fatos.length) {
      for (let i = 0; i < this.respostas.length; i++) {
        if(this.respostas[i] != this.fatos[i].resposta) {
          this.respostaFinal = "negativo"
          return false;
        }  
      }
      this.respostaFinal = "positivo"
      return true;
    }   
    return null;
  }
    

}
