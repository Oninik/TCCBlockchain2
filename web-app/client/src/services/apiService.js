import Api from '@/services/api'

export default {
  castBallot(electionId, cpf, picked) {
    return Api().post('castBallot', {       
      electionId: electionId,
      cpf: cpf,
      picked: picked
    })
  },
  queryAll() {
    return Api().get('queryAll')
  },
  queryByObjectType() {
    return Api().get('queryByObjectType')
  },
  queryWithQueryString(selected) {
    return Api().post('queryWithQueryString', {
      selected: selected
    }) 
  },
  registerVoter(cpf, rg, nome) {
    return Api().post('registerVoter', {
      cpf: cpf,
      rg: rg,
      nome: nome,
      
    }) 
  },
  validateVoter(cpf) {
    return Api().post('validateVoter', {
      cpf: cpf
    }) 
  },
  queryByKey(key) {
    return Api().post('queryByKey', {
      key: key
    }) 
  },
  getCurrentStanding() {
    return Api().get('getCurrentStanding')
  }
}