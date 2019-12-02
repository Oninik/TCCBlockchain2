'use strict';

class Votante {

  constructor(cpf, rg, nome) {
    if (this.validateVoter(cpf)) {
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
    } else if (!this.validateVoter(cpf)){
      throw new Error('the cpf is not valid.');
    }
  }
  /**
   *
   * validateVoter
   *
   * check for valid ID card - stateID or drivers License.
   *  
   * @param cpf - an array of choices 
   * @returns - yes if valid Voter, no if invalid
   */
  async validateVoter(cpf) {
    //cpf error checking here, i.e. check if valid drivers License, or state ID
    if (cpf) {
      return true;
    } else {
      return false;
    }
  }

}
module.exports = Voter;