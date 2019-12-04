import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VotacaoService } from 'src/app/services/votacao.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagvot',
  templateUrl: './pagvot.component.html',
  styleUrls: ['./pagvot.component.scss']
})
export class PagvotComponent implements OnInit {

  basicForm: FormGroup;

  constructor(private builder: FormBuilder, private votacao: VotacaoService, private route: Router) {
    this.basicForm = this.builder.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      voto: ['', Validators.required]
    });
  }

  ngOnInit() {
  }



enviarVoto() {
  // tslint:disable-next-line: prefer-const
  let newTmpObj = {
    nome: this.basicForm.getRawValue().nome,
    cpf: this.basicForm.getRawValue().cpf,
    voto: this.basicForm.getRawValue().voto,
  };

  this.votacao.Votar(newTmpObj).subscribe(
    resp => {
      console.log(resp);
      this.route.navigate(['paguser']);
    }, err => {
      console.log(err);
    }
  );

}


}
