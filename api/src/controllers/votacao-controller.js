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

    votacaoNet.createVotacao(body.nome, opcoesString, participantesString, body.startDate, body.endDate).then(
        resp => {
            res.status(200).send("Votacao criada com sucesso!!");
        }, err => {
            res.status(400).send(err);
        }
    );
};

exports.readVotacao = (req, res) => {
    let query = req.query;

    votacaoNet.readVotacao(query.nomeVotacao).then(
        resp => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(resp);
        }, err => {
            res.status(400).send(err);
        }
    );
};

exports.adicionarOpcao = (req, res) => {
    
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

    votacaoNet.createVotacao(body.nome, opcoesString, participantesString, body.startDate, body.endDate).then(
        resp => {
            res.status(200).send("Votacao criada com sucesso!!");
        }, err => {
            res.status(400).send(err);
        }
    );
};

exports.retirarOpcao = (req, res) => {};

exports.adicionarVotante = (req, res) => {};

exports.retirarVotante = (req, res) => {};

exports.alterarDataIni = (req, res) => {};

exports.Votar = (req, res) => {
    
    let body = req.body;
    console.log("Eae deu certo");

    votacaoNet.Votar(body.nome, body.cpf, body.voto).then(
        resp => {
            res.status(200).send("Voto realizado com sucesso!!");
        }, err => {
            res.status(400).send(err);
        }
    );
};

exports.criarVotante = (req, res) => {};