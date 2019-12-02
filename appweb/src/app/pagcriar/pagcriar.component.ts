import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-pagcriar',
  templateUrl: './pagcriar.component.html',
  styleUrls: ['./pagcriar.component.scss']
})
export class PagcriarComponent implements OnInit {

  basicForm: FormGroup;
    opcoes = [];
    votantes = [];

  constructor(private builder: FormBuilder) {
    this.basicForm = this.builder.group({
      option: ['', Validators.required],
      option1: ['', Validators.required]
    });
   }

  ngOnInit() {
  }


  inputOption1() {
    const value = this.basicForm.getRawValue();
    this.opcoes.push(value.option);
    this.basicForm.reset();
  }
  inputOption2() {
    const value = this.basicForm.getRawValue();
    this.votantes.push(value.option1);
    this.basicForm.reset();
  }

}
