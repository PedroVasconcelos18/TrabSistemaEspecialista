import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { SistemaService } from 'src/app/services/sistema.service';

@Component({
  selector: 'app-sistema',
  templateUrl: './sistema.component.html',
  styleUrls: ['./sistema.component.css']
})
export class SistemaComponent implements OnInit {

  sistemas: any = [];

  constructor(private sistemaService: SistemaService, private router: Router) { }

  ngOnInit(): void {
    this.sistemaService.get().subscribe(sistemas => {
      this.sistemas = sistemas
    }) 
   }

  formSistema = new FormGroup({
    id: new FormControl(''),
    nomeSistema: new FormControl('', Validators.required)
  })

  formEditSistema = new FormGroup({
    id: new FormControl(''),
    nomeSistema: new FormControl('', Validators.required)
  })

  dialogCadastrarSistema = {
    title: 'Cadastro de sistema',
    visible: false,
    onCancel: () => {
      this.dialogCadastrarSistema.visible = false;
    },
    onOk: () => {
      this.createSistema();
      this.dialogCadastrarSistema.visible = false;
    },
  }

  dialogEditSistema = {
    title: 'Editar de sistema',
    visible: false,
    onCancel: () => {
      this.dialogEditSistema.visible = false;
    },
    onOk: () => {
      this.editSistema();
      this.dialogEditSistema.visible = false;
    },
  }

  dialogDeleteSistema= {
    title: 'Excluir sistema',
    visible: false,
    onCancel: () => {
      this.dialogDeleteSistema.visible = false;
    },
    onOk: () => {
      
    },
  }

  
  openCadastroSistema() {
    this.dialogCadastrarSistema.visible = true;
  }
  
  createSistema(): void {
    if(!this.formSistema.invalid) {
      this.sistemaService.create(this.formSistema.value).subscribe(() => {
        this.sistemaService.messageSuccess("Sistema salvo!");
        location.reload();
      });
    }
  }
  
  openEditSistema(id: any) {
    this.sistemaService.getById(id).subscribe(sistema => {
      this.formEditSistema.controls['id'].patchValue(sistema.id);
      this.formEditSistema.controls['nomeSistema'].patchValue(sistema.nomeSistema);
    });
    this.dialogEditSistema.visible = true;
  }

  editSistema() {
    if(!this.formEditSistema.invalid) {
      this.sistemaService.update(this.formEditSistema.value).subscribe(() => {
        this.sistemaService.messageSuccess("Sistema atualizado!");
        location.reload();
      });
    }
  }

  openDeleteSistema(id: any) {
    this.dialogDeleteSistema.visible = true;
    this.dialogDeleteSistema.onOk = () => {
      this.deletarSistema(id);
      this.dialogDeleteSistema.visible = false;
    }
  }

  deletarSistema(id: any) {
    this.sistemaService.delete(id).subscribe(() => {
      this.sistemaService.messageSuccess("Sistema deletado.")
      location.reload();
    });
  }

}
