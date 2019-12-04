import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagcriar',
  templateUrl: './pagcriar.component.html',
  styleUrls: ['./pagcriar.component.scss']
})
export class PagcriarComponent implements OnInit {

  basicForm: FormGroup;
  opcoes = [];
  votantes = [];

  constructor(private builder: FormBuilder, private route: Router) {
    this.basicForm = this.builder.group({
      nome: ['', Validators.required],
      option: ['', Validators.required],
      option1: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  inputOption1() {
    const value = this.basicForm.getRawValue();
    this.opcoes.push(value.option);
    this.basicForm.controls['option'].setValue('');
  }

  inputOption2() {
    const value = this.basicForm.getRawValue();
    this.votantes.push(value.option1);
    this.basicForm.controls['option1'].setValue('');
  }

  avanca() {
    localStorage.removeItem('tmpVotacao');
    let tempObj = {
      nome: this.basicForm.getRawValue().nome,
      opcoes: this.opcoes,
      participantes: this.votantes
    }
    localStorage.setItem('tmpVotacao', JSON.stringify(tempObj));
    this.route.navigate(['pagcriar2']);
  }

}
