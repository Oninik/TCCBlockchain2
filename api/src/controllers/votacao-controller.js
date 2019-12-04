const votacaoNet = require('../network/votacao-network');

exports.createVotacao = (req, res) => {

    let body = req.body;

    let opcoes = body.opcoes;

    let opcoesString = "[";

    opcoes.forEach(function (item, indice) {
        opcoesString += '\"' + item + '\"';
        if(indice+1 < opcoes.length){
            opcoesString += ','
        }
    });

    opcoesString += ']';

    let participantes = body.participantes;
    let participantesString = "[";

    participantes.forEach(function (item, indice) {
        participantesString += '\"' + item + '\"';
        if(indice+1 < opcoes.length){
            participantesString += ','
        }
    });

    participantesString += ']';

    votacaoNet.createVotacao(body.nome, opcoesString, participantesString, body.startDate, body.endDate);
    
    res.send("Ta suave");
};

exports.readVotacao = (req, res) => {};

exports.adicionarOpcao = (req, res) => {};

exports.retirarOpcao = (req, res) => {};

exports.adicionarVotante = (req, res) => {};

exports.retirarVotante = (req, res) => {};

exports.alterarDataIni = (req, res) => {};

exports.votar = (req, res) => {};

exports.criarVotante = (req, res) => {};