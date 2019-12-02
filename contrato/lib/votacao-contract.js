/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

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
        const asset = JSON.parse(buffer.toString());
        
        console.log(`Dados da votação: ${asset}`);
        return asset;
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

    async UpDeleteVotacao(ctx, nome, sopcao, sparticipante){
        const exists = await this.votacaoExists(ctx, nome);
        if (!exists) {
            throw new Error(`A votação ${nome} não existe`);
        }
        var i;
        let VotacaoDoCara =  await ctx.stub.getState(nome);
        VotacaoDoCara = JSON.parse(VotacaoDoCara);
        if(VotacaoDoCara.startDate >= hoje)
        {
            throw new Error(`A votação já começou, não é mais possivel mudá-la`);
        }
        if(sopcao !== 'null'){
            for(i=0; i<VotacaoDoCara.opcoes.length; i++){
                if(VotacaoDoCara.opcoes[i] == sopcao)
                    {
                        VotacaoDoCara.opcoes.splice(i, 1);
                        VotacaoDoCara.votos.splice(i, 1);
                    }
            }
        }
        if(sparticipante !== 'null'){
            for(i=0; i<VotacaoDoCara.participantes.length; i++){
                if(VotacaoDoCara.participantes[i] == sparticipante){
                    VotacaoDoCara.participantes.splice(i, 1);
                    VotacaoDoCara.JaVotou.splice(i, 1);

                }
            }
        }
        
        const buffer = Buffer.from(JSON.stringify(VotacaoDoCara));
        await ctx.stub.putState(nome, buffer);

    }
    async deleteVotacao(ctx, nome) {
        const exists = await this.votacaoExists(ctx, nome);
        if (!exists) {
            throw new Error(`A votação ${nome} não existe`);
        }
        await ctx.stub.deleteState(nome);
    }

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

}

module.exports = VotacaoContract;
