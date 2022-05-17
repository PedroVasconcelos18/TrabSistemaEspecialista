import { Fato } from './../../model/fato.model';
import { FatoService } from './../../services/fato.service';
import { SistemaService } from 'src/app/services/sistema.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Problema } from 'src/app/model/problema.model';
import { ProblemasService } from 'src/app/services/problemas.service';

@Component({
  selector: 'app-problemas',
  templateUrl: './problemas.component.html',
  styleUrls: ['./problemas.component.css']
})
export class ProblemasComponent implements OnInit {

  problemas!: Problema[];
  sistemas: any = [];
  idSistemaSelecionado: Number = 0;
  fato: Problema = {
    id: 0,
    idSistema: this.idSistemaSelecionado.toString(),
    nomeProblema: "",
    descricao: "",
    fatos: [],
    resposta: ""
  };

  constructor(private sistemaService : SistemaService, private problemasService: ProblemasService) { }

  ngOnInit(): void {
    this.sistemaService.get().subscribe(sistemas => {
      this.sistemas = sistemas
    });    
  }

  formProblema = new FormGroup({
    id: new FormControl(''),
    idSistema: new FormControl(''),
    nomeProblema: new FormControl('', Validators.required),
    descricao: new FormControl('', Validators.required),
  });

  formEditProblema = new FormGroup({
    id: new FormControl(''),
    idSistema: new FormControl(''),
    nomeProblema: new FormControl('', Validators.required),
    descricao: new FormControl('', Validators.required),
  });

  dialogCadastrarProblemas = {
    title: 'Cadastro de problema',
    visible: false,
    onCancel: () => {
      this.dialogCadastrarProblemas.visible = false;
    },
    onOk: () => {
      this.createProblema();
      this.dialogCadastrarProblemas.visible = false;
    },
  }

  dialogEditProblemas = {
    title: 'Editar problema',
    visible: false,
    onCancel: () => {
      this.dialogEditProblemas.visible = false;
    },
    onOk: () => {
      this.editProblema();
      this.dialogEditProblemas.visible = false;
    },
  }

  dialogDeleteProblemas= {
    title: 'Excluir problema',
    visible: false,
    onCancel: () => {
      this.dialogDeleteProblemas.visible = false;
    },
    onOk: () => {},
  }

  openCadastroProblema() {
    this.dialogCadastrarProblemas.visible = true;
    this.formProblema.controls["nomeProblema"].patchValue("");
    this.formProblema.controls["descricao"].patchValue("");
  }

  openEditProblema(id: any) {
    this.problemasService.getById(id).subscribe(problema => {
      this.formEditProblema.controls['id'].patchValue(problema.id);
      this.formEditProblema.controls['idSistema'].patchValue(problema.idSistema);
      this.formEditProblema.controls['nomeProblema'].patchValue(problema.nomeProblema);
      this.formEditProblema.controls['descricao'].patchValue(problema.descricao);
    });
    this.dialogEditProblemas.visible = true;
  }

  
  createProblema(): void {
    this.formProblema.controls["idSistema"].patchValue(this.idSistemaSelecionado.toString());

    this.problemasService.create(this.formProblema.value).subscribe(() => {
      this.problemasService.message("Problema salvo com sucesso.")
      this.carregarProblemas();
    })
  }
  
  editProblema() {
    if(!this.formEditProblema.invalid) {
      this.problemasService.update(this.formEditProblema.value).subscribe(() => {
        this.sistemaService.messageSuccess("Problema atualizado!");
        this.carregarProblemas();
      });
    }
  }

  openDeleteProblema(id: any) {
    this.dialogDeleteProblemas.visible = true;
    this.dialogDeleteProblemas.onOk = () => {
      this.deletarProblema(id);
      this.dialogDeleteProblemas.visible = false;
    }
  }
  
  deletarProblema(id: any) {
    this.problemasService.delete(id).subscribe(() => {
      this.sistemaService.messageSuccess("Problema deletado.")
      this.carregarProblemas();
    });
  }

  carregarProblemas(){
    this.problemasService.getByIdSistema(this.idSistemaSelecionado).subscribe(problemas => {
      this.problemas = problemas
    });
  }




}
