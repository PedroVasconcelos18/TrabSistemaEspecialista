import { ProblemasService } from 'src/app/services/problemas.service';
import { FatoService } from './../../services/fato.service';
import { SistemaService } from './../../services/sistema.service';
import { Component, OnInit } from '@angular/core';
import { Problema } from 'src/app/model/problema.model';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent implements OnInit {

  faCircleInfoIcon = faCircleInfo;

  sistemas: any = [];
  fatos: any = [];
  problemas: Problema[] = [];
  idSistemaSelecionado: Number = 0;
  respostas: any = []
  respostaFinal: String = "";
  idsRepetidos: Number[] = [];

  constructor(private sistemaService : SistemaService, private fatosService: FatoService, private problemasService: ProblemasService) { }

  ngOnInit(): void {
    this.sistemaService.get().subscribe(sistemas => {
      this.sistemas = sistemas
    });  
  }

  carregarFatos(idProblema: any) {
    this.idsRepetidos = [];
    this.respostaFinal = "";
    this.respostas = [];
    this.fatosService.getByIdProblema(idProblema).subscribe(fatos => {
      this.fatos = fatos;
    });
  }

  carregarProblemas() {
    this.problemasService.getByIdSistema(this.idSistemaSelecionado).subscribe(problemas => {
      this.problemas = problemas;
      for (let i = 0; i < this.problemas.length; i++) {
        this.fatosService.getByIdProblema(this.problemas[i].id).subscribe(fatos => {
          this.problemas[i].fatos = fatos;
        });
      }
    });

    
  }

  afterAnswer(resposta: String, problema: Problema, fatoId: any) {
    
    // Sistema para bloquear duas respostas
    // for (let i = 0; i < problema.fatos.length; i++) {

    //   for (let y = 0; y < this.idsRepetidos.length; i++) {

    //     if(problema.fatos[i].id == this.idsRepetidos[i]) {
    //       return this.sistemaService.messageDanger("A resposta dessa pergunta já foi computada.");
    //     }  

    //   }

    // }
    this.idsRepetidos.push(fatoId);
    console.log(this.idsRepetidos);
    this.respostas.push(resposta);

    if(this.respostas.length == problema.fatos.length) {
      console.log("entrei");
      for (let i = 0; i < this.respostas.length; i++) {
        if(this.respostas[i] != problema.fatos[i].resposta) {
          problema.resposta = "negativo";
          this.respostas = [];
          return false;
        }  
      }
      problema.resposta = "positivo";
      this.respostas = [];
      return true;
    }   
    return null;
  }
    

}
