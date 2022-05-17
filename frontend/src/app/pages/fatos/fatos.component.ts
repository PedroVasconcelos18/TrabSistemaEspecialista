import { ProblemasService } from 'src/app/services/problemas.service';
import { FatoService } from '../../services/fato.service';
import { Sistema } from '../../model/sistema.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SistemaService } from '../../services/sistema.service';
import { Component, OnInit } from '@angular/core';
import { Fato } from '../../model/fato.model';
import { Problema } from 'src/app/model/problema.model';

@Component({
  selector: 'app-fatos',
  templateUrl: './fatos.component.html',
  styleUrls: ['./fatos.component.css']
})
export class FatosComponent implements OnInit {

  fatos!: Fato[];
  problemas!: Problema[];
  sistemas: any = [];
  idSistemaSelecionado: Number = 0;
  idProblemaSelecionado: Number = 0;
  fato: Fato = {
    id: 0,
    idSistema: this.idSistemaSelecionado.toString(),
    idProblema: this.idProblemaSelecionado.toString(),
    valorFato: "",
    descricao: "",
    motivo: "",
    resposta: "false",
  };

  constructor(
    private sistemaService : SistemaService, 
    private fatosService: FatoService, 
    private problemasService: ProblemasService) { }

  ngOnInit(): void {
    this.sistemaService.get().subscribe(sistemas => {
      this.sistemas = sistemas
    });    
  }

  formFato = new FormGroup({
    id: new FormControl(''),
    idSistema: new FormControl(''),
    idProblema: new FormControl(''),
    valorFato: new FormControl('', Validators.required),
    descricao: new FormControl('', Validators.required),
    motivo: new FormControl('', Validators.required),
    resposta: new FormControl('', Validators.required),
  })

  formEditFato = new FormGroup({
    id: new FormControl(''),
    idSistema: new FormControl(''),
    idProblema: new FormControl(''),
    valorFato: new FormControl('', Validators.required),
    descricao: new FormControl('', Validators.required),
    motivo: new FormControl('', Validators.required),
    resposta: new FormControl('', Validators.required),
  })

  dialogCadastrarFatos = {
    title: 'Cadastro de fato',
    visible: false,
    onCancel: () => {
      this.dialogCadastrarFatos.visible = false;
    },
    onOk: () => {
      this.createFato();
      this.dialogCadastrarFatos.visible = false;
    },
  }

  dialogEditFato = {
    title: 'Editar fato',
    visible: false,
    onCancel: () => {
      this.dialogEditFato.visible = false;
    },
    onOk: () => {
      this.editFato();
      this.dialogEditFato.visible = false;
    },
  }

  dialogDeleteFato= {
    title: 'Excluir fato',
    visible: false,
    onCancel: () => {
      this.dialogDeleteFato.visible = false;
    },
    onOk: () => {},
  }

  openCadastroFato() {
    this.dialogCadastrarFatos.visible = true;
    this.formFato.controls["descricao"].patchValue("");
    this.formFato.controls["resposta"].patchValue("");
    this.formFato.controls["motivo"].patchValue("");
  }

  openEditFato(id: any) {
    this.fatosService.getById(id).subscribe(fato => {
      this.formEditFato.controls['id'].patchValue(fato.id);
      this.formEditFato.controls['idSistema'].patchValue(fato.idSistema);
      this.formEditFato.controls['idProblema'].patchValue(fato.idProblema);
      this.formEditFato.controls['valorFato'].patchValue(fato.valorFato);
      this.formEditFato.controls['descricao'].patchValue(fato.descricao);
      this.formEditFato.controls['motivo'].patchValue(fato.motivo);
      this.formEditFato.controls['resposta'].patchValue(fato.resposta);
    });
    this.dialogEditFato.visible = true;
  }

  
  createFato(): void {
    
    if(!this.formFato.invalid) { 
      this.formFato.controls["idSistema"].patchValue(this.idSistemaSelecionado.toString());
      this.formFato.controls["idProblema"].patchValue(this.idProblemaSelecionado.toString());
      this.fatosService.create(this.formFato.value).subscribe(() => {
        this.fatosService.message("Fato salvo com sucesso.")
        this.carregarFatos();
      });
    }
  }
  
  editFato() {
    if(!this.formEditFato.invalid) {
      this.fatosService.update(this.formEditFato.value).subscribe(() => {
        this.sistemaService.messageSuccess("Fato atualizado!");
        this.carregarFatos();
      });
    }
  }

  openDeleteFato(id: any) {
    this.dialogDeleteFato.visible = true;
    this.dialogDeleteFato.onOk = () => {
      this.deletarFato(id);
      this.dialogDeleteFato.visible = false;
    }
  }
  
  deletarFato(id: any) {
    this.fatosService.delete(id).subscribe(() => {
      this.sistemaService.messageSuccess("Fato deletado.")
      this.carregarFatos();
    });
  }

  carregarFatos(){
    this.fatosService.getByIdProblema(this.idProblemaSelecionado).subscribe(fatos => {
      this.fatos = fatos
    });
  }

  carregarProblemas(){
    this.problemasService.getByIdSistema(this.idSistemaSelecionado).subscribe(problemas => {
      this.fatos = [];
      this.problemas = problemas;
    });
  }


}
