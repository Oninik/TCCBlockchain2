import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VotacaoService } from 'src/app/services/votacao.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pagadop',
  templateUrl: './pagadop.component.html',
  styleUrls: ['./pagadop.component.scss']
})
export class PagadopComponent implements OnInit {

  basicForm: FormGroup;

  constructor(private builder: FormBuilder, private votacao: VotacaoService, private route: Router) {
    this.basicForm = this.builder.group({
      nome: ['', Validators.required],
      newopcao: ['', Validators.required]
    });
  }

  ngOnInit() {
  }



enviarNewOpcao() {
  // tslint:disable-next-line: prefer-const
  let newTmpObj = {
    nome: this.basicForm.getRawValue().nome,
    newopcao: this.basicForm.getRawValue().newopcao
  };

  this.votacao.adicionarOpcao(newTmpObj).subscribe(
    resp => {
      console.log(resp);
      this.route.navigate(['paguser']);
    }, err => {
      console.log(err);
    }
  );

}


}
