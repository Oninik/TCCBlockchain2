import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VotacaoService } from 'src/app/services/votacao.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagcriar2',
  templateUrl: './pagcriar2.component.html',
  styleUrls: ['./pagcriar2.component.scss']
})
export class Pagcriar2Component implements OnInit {

  private tmpObj;

  basicForm: FormGroup;

  constructor(private builder: FormBuilder, private votacao: VotacaoService, private route: Router) {
    this.basicForm = this.builder.group({
      dataInicio: ['', Validators.required],
      dataFim: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.tmpObj = JSON.parse(localStorage.getItem('tmpVotacao'));
  }

  enviarVotacao() {
    // tslint:disable-next-line: prefer-const
    let newTmpObj = { ...this.tmpObj,
      startDate: this.basicForm.getRawValue().dataInicio,
      endDate: this.basicForm.getRawValue().dataFim
    };
    this.votacao.createVotacao(newTmpObj).subscribe(
      resp => {
        console.log(resp);
        this.route.navigate(['paguser']);
      }, err => {
        console.log(err);
      }
    );

  }
}
