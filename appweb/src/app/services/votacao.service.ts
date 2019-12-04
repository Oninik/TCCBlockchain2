import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VotacaoService {

  constructor(private http: HttpClient) { }

  public createVotacao(votacao): Observable<any> {
    let url = environment.apiBaseURL + '/create';
    return this.http.post(url,votacao);
  }

  public readVotacao(nome): Observable<any> {
    let url = environment.apiBaseURL + '/read?nomeVotacao=' + nome;
    return this.http.get(url);
  }
}
