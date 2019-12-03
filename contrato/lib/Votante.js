'use strict';

class Votante {

  constructor(cpf, rg, nome) {
    if (this.validarVotante(!cpf)) {
        this.cpf = cpf;
        this.rg = rg;
        this.nome = nome;
        this.type = 'voter';
        if (this.__isContract) {
            delete this.__isContract;
        }
        if (this.name) {
            delete this.name;
        }
        return this;
    } else if (!this.validarVotante(cpf)){
      throw new Error('O cpf já está registrado');
    }
  }
  /**
   *
   * validarVotante
   *
   * check for valid ID card - stateID or drivers License.
   *  
   * @param cpf - an array of choices 
   * @returns - yes if valid Voter, no if invalid
   */
  async validarVotante(cpf) {
    //cpf error checking here, i.e. check if valid drivers License, or state ID
    if (cpf) {
      return true;
    } else {
      return false;
    }
  }

}
module.exports = Votante;