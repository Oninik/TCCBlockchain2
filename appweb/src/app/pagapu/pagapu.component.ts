import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VotacaoService } from '../services/votacao.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagapu',
  templateUrl: './pagapu.component.html',
  styleUrls: ['./pagapu.component.scss']
})
export class PagapuComponent implements OnInit {

  basicForm: FormGroup;

  constructor(private builder: FormBuilder, private votacao: VotacaoService, private route: Router) { 
    this.basicForm = this.builder.group({
      nome: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  consultar() {
    let nome = this.basicForm.getRawValue().nome;
    this.votacao.readVotacao(nome).subscribe(
      resp => {
        localStorage.removeItem('tempResultado');
        // console.log(resp);
        localStorage.setItem('tempResultado',JSON.stringify(resp));
        this.route.navigate(['pagres']);
      }, err => {
        console.log(err);
      }
    );
    // console.log(nome)
  }

}
