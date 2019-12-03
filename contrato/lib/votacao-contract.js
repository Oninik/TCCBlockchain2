/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');
const path = require('path');
const fs = require('fs');

let Votante = require('./Votante.js');
// // importa o arquivo que contém o constructor e suas funcoes axiliares
// let Votante = require('./Votante.js');

class VotacaoContract extends Contract {

    async votacaoExists(ctx, nome) {
    const buffer = await ctx.stub.getState(nome);
        return (!!buffer && buffer.length > 0);
    }

    async createVotacao(ctx, nome, opcoes, participantes, startDate, endDate) {
        const exists = await this.votacaoExists(ctx, nome);
        if (exists) {
            throw new Error(`A votação ${nome} não existe`);
        }
        let dataInicio = startDate;
        dataInicio = Date.parse(dataInicio);
        let dataFim = endDate;
        dataFim = Date.parse(dataFim);
        participantes = JSON.parse(participantes);
        opcoes = JSON.parse(opcoes);
        // var opcoes = ["Cara1", "Cara2"];
        if(dataInicio >= dataFim){
            throw new Error(`As datas da votação ${nome} são inválidas`);
        }
        if(opcoes.length < 2){
            throw new Error(`A votação ${nome} precisa ter 2 ou mais opções de voto`);
        }
        if(participantes.length < 2){
            throw new Error(`A votação ${nome} precisar ter 2 ou mais participantes`)
        }
        var i = 0;
        var votos = [];
        var JaVotou = [];
        for(i=0; i<opcoes.length; i++)
        {
            votos[i] = 0;
        }
        for(i=0; i<participantes.length; i++){
            JaVotou[i] = false;
        }
        const asset = { 
            nome: nome,
            opcoes: opcoes,
            votos: votos,
            participantes: participantes,
            JaVotou: JaVotou,
            startDate: startDate,
            endDate: endDate
        
         };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(nome, buffer);
    }

    async readVotacao(ctx, nome) {
        const exists = await this.votacaoExists(ctx, nome);
        if (!exists) {
            throw new Error(`A votação ${nome} não existe`);
        }
        const buffer = await ctx.stub.getState(nome);
        //buffer.JaVotou = "segredo"
        const asset = JSON.parse(buffer.toString());
        console.log(`Dados da votação: ${asset}`);
        return asset;
    }

    async adicionarOpcao(ctx, nome, newopcoes){
        const exists = await this.votacaoExists(ctx, nome);
        if (!exists) {
            throw new Error(`A votação ${nome} não existe`);
        }
        if(newopcoes == 'null'){
            throw new Error(`É necessário preencher o campo com a nova opção que deseja adicionar`);
        }
        var i;
        let VotacaoDoCara =  await ctx.stub.getState(nome);
        VotacaoDoCara = JSON.parse(VotacaoDoCara);
        let hoje = new Date();
        hoje = Date.parse(hoje);
        if(VotacaoDoCara.startDate >= hoje)
        {
            throw new Error(`A votação já começou, não é mais possivel mudá-la`);
        }
        for(i=0; i<VotacaoDoCara.opcoes.length; i++){
            if(VotacaoDoCara.opcoes[i] == newopcoes){
                throw new Error(`Essa opção de voto já está na votação`)
            }
        }
        VotacaoDoCara.opcoes.push(newopcoes);
        VotacaoDoCara.votos.push(0);

    }

    async retirarOpcao(ctx, nome, sopcao){
        const exists = await this.votacaoExists(ctx, nome);
        if (!exists) {
            throw new Error(`A votação ${nome} não existe`);
        }
        if (!sopcao)
        {
            throw new Error(`É preciso preencher o campo com a nova opção`);
        }
        var i;
        let VotacaoDoCara =  await ctx.stub.getState(nome);
        VotacaoDoCara = JSON.parse(VotacaoDoCara);
        if(VotacaoDoCara.startDate >= hoje)
        {
            throw new Error(`A votação já começou, não é mais possivel mudá-la`);
        }
        
        for(i=0; i<VotacaoDoCara.opcoes.length; i++){
            if(VotacaoDoCara.opcoes[i] == sopcao)
                {
                    VotacaoDoCara.opcoes.splice(i, 1);
                    VotacaoDoCara.votos.splice(i, 1);
                }
            
        }
    }

    async adicionarVotante(ctx, nome, newparticipantes){
        const exists = await this.votacaoExists(ctx, nome);
        if (!exists) {
            throw new Error(`A votação ${nome} não existe`);
        }
        if (!newparticipantes)
        {
            throw new Error(`É preciso preencher o campo com a nova opção`);
        }
        var i;
        let VotacaoDoCara =  await ctx.stub.getState(nome);
        VotacaoDoCara = JSON.parse(VotacaoDoCara);
        if(VotacaoDoCara.startDate >= hoje)
        {
            throw new Error(`A votação já começou, não é mais possivel mudá-la`);
        }

        for(i=0; i<VotacaoDoCara.participantes.length; i++){
            if(VotacaoDoCara.participantes[i] == newparticipantes){
                throw new Error(`Esse participante já está na votação`)
            }
        }
        VotacaoDoCara.participantes.push(newparticipantes);
        VotacaoDoCara.JaVotou.push(false);
    }

    async retirarVotante(ctx, nome, sparticipante){
        const exists = await this.votacaoExists(ctx, nome);
        if (!exists) {
            throw new Error(`A votação ${nome} não existe`);
        }
        if (!sparticipante)
        {
            throw new Error(`É preciso preencher o campo com a nova opção`);
        }
        var i;
        let VotacaoDoCara =  await ctx.stub.getState(nome);
        VotacaoDoCara = JSON.parse(VotacaoDoCara);
        if(VotacaoDoCara.startDate >= hoje)
        {
            throw new Error(`A votação já começou, não é mais possivel mudá-la`);
        }
        for(i=0; i<VotacaoDoCara.participantes.length; i++){
            if(VotacaoDoCara.participantes[i] == sparticipante){
                VotacaoDoCara.participantes.splice(i, 1);
                VotacaoDoCara.JaVotou.splice(i, 1);

            }
        }

    }

    async alterarDataIni(ctx, nome, newStartDate){
        const exists = await this.votacaoExists(ctx, nome);
        if (!exists) {
            throw new Error(`A votação ${nome} não existe`);
        }
        if (!newStartDate)
        {
            throw new Error(`É preciso preencher o campo com a nova opção`);
        }
        var i;
        let VotacaoDoCara =  await ctx.stub.getState(nome);
        VotacaoDoCara = JSON.parse(VotacaoDoCara);
        if(VotacaoDoCara.startDate >= hoje)
        {
            throw new Error(`A votação já começou, não é mais possivel mudá-la`);
        }
        if(newStartDate > VotacaoDoCara.endDate){
            throw new Error(`A data de inicio de uma votação não pode ser antes da data de fim dela.`)
            
        }
        VotacaoDoCara.startDate = newStartDate;
}

    async updateVotacao(ctx, nome, newopcoes, newparticipantes, newStartDate, newEndDate) {
        const exists = await this.votacaoExists(ctx, nome);
        if (!exists) {
            throw new Error(`A votação ${nome} não existe`);
        }
        var i;
        let VotacaoDoCara =  await ctx.stub.getState(nome);
        VotacaoDoCara = JSON.parse(VotacaoDoCara);
        let hoje = new Date();
        hoje = Date.parse(hoje);
        if(VotacaoDoCara.startDate >= hoje)
        {
            throw new Error(`A votação já começou, não é mais possivel mudá-la`);
        }
        if(newopcoes !== 'null'){
            for(i=0; i<VotacaoDoCara.opcoes.length; i++){
                if(VotacaoDoCara.opcoes[i] == newopcoes){
                    throw new Error(`Essa opção de voto já está na votação`)
                }
            }
            VotacaoDoCara.opcoes.push(newopcoes);
            VotacaoDoCara.votos.push(0);
        }
        if(newparticipantes !== 'null'){
            for(i=0; i<VotacaoDoCara.participantes.length; i++){
                if(VotacaoDoCara.participantes[i] == newparticipantes){
                    throw new Error(`Esse participante já está na votação`)
                }
            }
            VotacaoDoCara.participantes.push(newparticipantes);
            VotacaoDoCara.JaVotou.push(false);
        }
        if(newStartDate !== 'null'){
            VotacaoDoCara.startDate = newStartDate;
        }
        if(newEndDate !== 'null'){
            VotacaoDoCara.endDate = newEndDate;
        }

        const buffer = Buffer.from(JSON.stringify(VotacaoDoCara));
        await ctx.stub.putState(nome, buffer);
    }

    // async UpDeleteVotacao(ctx, nome, sopcao, sparticipante){
    //     const exists = await this.votacaoExists(ctx, nome);
    //     if (!exists) {
    //         throw new Error(`A votação ${nome} não existe`);
    //     }
    //     var i;
    //     let VotacaoDoCara =  await ctx.stub.getState(nome);
    //     VotacaoDoCara = JSON.parse(VotacaoDoCara);
    //     if(VotacaoDoCara.startDate >= hoje)
    //     {
    //         throw new Error(`A votação já começou, não é mais possivel mudá-la`);
    //     }
    //     if(sopcao !== 'null'){
    //         for(i=0; i<VotacaoDoCara.opcoes.length; i++){
    //             if(VotacaoDoCara.opcoes[i] == sopcao)
    //                 {
    //                     VotacaoDoCara.opcoes.splice(i, 1);
    //                     VotacaoDoCara.votos.splice(i, 1);
    //                 }
    //         }
    //     }
    //     if(sparticipante !== 'null'){
    //         for(i=0; i<VotacaoDoCara.participantes.length; i++){
    //             if(VotacaoDoCara.participantes[i] == sparticipante){
    //                 VotacaoDoCara.participantes.splice(i, 1);
    //                 VotacaoDoCara.JaVotou.splice(i, 1);

    //             }
    //         }
    //     }
        
    //     const buffer = Buffer.from(JSON.stringify(VotacaoDoCara));
    //     await ctx.stub.putState(nome, buffer);

    // }
    // async deleteVotacao(ctx, nome) {
    //     const exists = await this.votacaoExists(ctx, nome);
    //     if (!exists) {
    //         throw new Error(`A votação ${nome} não existe`);
    //     }
    //     await ctx.stub.deleteState(nome);
    // }

    async Votar(ctx, nome, cpf, voto){
        const exists = await this.votacaoExists(ctx, nome);
        if (!exists) {
            throw new Error(`A votação ${nome} não existe`);
        }
        let hoje = new Date();
        hoje = Date.parse(hoje);
        let VotacaoDoCara =  await ctx.stub.getState(nome);
        VotacaoDoCara = JSON.parse(VotacaoDoCara);
        let startDate = Date.parse(VotacaoDoCara.startDate);
        let endDate = Date.parse(VotacaoDoCara.endDate);
        var i, y;
        var k=0;
        if(hoje<startDate || hoje>=endDate)
        {
            throw new Error(`A votação ${nome} não está aberta no momento`)
        }
        for(i=0;i<=VotacaoDoCara.participantes.length; i++){
            if(cpf == VotacaoDoCara.participantes[i]){
                k--;
            }else k++;
            if(VotacaoDoCara.participantes.length == k){
                throw new Error(`O cpf ${cpf} não participa da votação`);
            }
        }
        for(i=0; i<VotacaoDoCara.participantes.length; i++){
            if(VotacaoDoCara.participantes[i] == cpf){
                if(VotacaoDoCara.JaVotou[i] == true){
                    throw new Error(`O cpf ${cpf} já votou`)
                }  
                VotacaoDoCara.JaVotou[i] = true; 
            }
        }
        for(i=0; i<VotacaoDoCara.opcoes.length; i++)
                {   
                    if(VotacaoDoCara.opcoes[i] == voto)
                    {
                        VotacaoDoCara.votos[i] = VotacaoDoCara.votos[i] + 1;
                        y = 1;
                    }
                }
        if(y != 1){
            throw new Error(`A opção de voto ${voto} não existe`);
        }
        
        const buffer = Buffer.from(JSON.stringify(VotacaoDoCara));
        await ctx.stub.putState(nome, buffer);

    }

    async criarVotante(ctx, cpf, rg, nome)
    {
        //criar o votante
        let newVotante = await new Votante(cpf, rg, nome);
    
        //atualizar o world state com o novo votante
        await ctx.stub.putState(newVotante.cpf, Buffer.from(JSON.stringify(newVotante)))
    
        let response = `Votante with cpf ${newVotante.cpf} is updated in the world state`;
        return response;
    }

    // Faz uma query de tudo com key-pair do world state
  async verTudo(ctx) {

    let queryString = {
      selector: {}
    };

    let resultadosDaQuery = await this.queryWithQueryString(ctx, JSON.stringify(queryString));
    return resultadosDaQuery;

  }

  async queryWithQueryString(ctx, queryString) {

    console.log('query String');
    console.log(JSON.stringify(queryString));

    let resultsIterator = await ctx.stub.getQueryResult(queryString);

    let allResults = [];

    // eslint-disable-next-line no-constant-condition
    while (true) {
      let res = await resultsIterator.next();

      if (res.value && res.value.value.toString()) {
        let jsonRes = {};

        console.log(res.value.value.toString('utf8'));

        jsonRes.Key = res.value.key;

        try {
          jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
        } catch (err) {
          console.log(err);
          jsonRes.Record = res.value.value.toString('utf8');
        }

        allResults.push(jsonRes);
      }
      if (res.done) {
        console.log('end of data');
        await resultsIterator.close();
        console.info(allResults);
        console.log(JSON.stringify(allResults));
        return JSON.stringify(allResults);
      }
    }
  }



}

module.exports = VotacaoContract;
