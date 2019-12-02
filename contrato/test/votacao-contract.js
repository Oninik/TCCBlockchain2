/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { ChaincodeStub, ClientIdentity } = require('fabric-shim');
const { VotacaoContract } = require('..');
const winston = require('winston');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

class TestContext {

    constructor() {
        this.stub = sinon.createStubInstance(ChaincodeStub);
        this.clientIdentity = sinon.createStubInstance(ClientIdentity);
        this.logging = {
            getLogger: sinon.stub().returns(sinon.createStubInstance(winston.createLogger().constructor)),
            setLevel: sinon.stub(),
        };
    }

}

describe('VotacaoContract', () => {

    let contract;
    let ctx;

    beforeEach(() => {
        contract = new VotacaoContract();
        ctx = new TestContext();
        ctx.stub.getState.withArgs('1001').resolves(Buffer.from('{"value":"votacao 1001 value"}'));
        ctx.stub.getState.withArgs('1002').resolves(Buffer.from('{"value":"votacao 1002 value"}'));
    });

    describe('#votacaoExists', () => {

        it('should return true for a votacao', async () => {
            await contract.votacaoExists(ctx, '1001').should.eventually.be.true;
        });

        it('should return false for a votacao that does not exist', async () => {
            await contract.votacaoExists(ctx, '1003').should.eventually.be.false;
        });

    });

    describe('#createVotacao', () => {

        it('should create a votacao', async () => {
            await contract.createVotacao(ctx, '1003', 'votacao 1003 value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1003', Buffer.from('{"value":"votacao 1003 value"}'));
        });

        it('should throw an error for a votacao that already exists', async () => {
            await contract.createVotacao(ctx, '1001', 'myvalue').should.be.rejectedWith(/The votacao 1001 already exists/);
        });

    });

    describe('#readVotacao', () => {

        it('should return a votacao', async () => {
            await contract.readVotacao(ctx, '1001').should.eventually.deep.equal({ value: 'votacao 1001 value' });
        });

        it('should throw an error for a votacao that does not exist', async () => {
            await contract.readVotacao(ctx, '1003').should.be.rejectedWith(/The votacao 1003 does not exist/);
        });

    });

    describe('#updateVotacao', () => {

        it('should update a votacao', async () => {
            await contract.updateVotacao(ctx, '1001', 'votacao 1001 new value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1001', Buffer.from('{"value":"votacao 1001 new value"}'));
        });

        it('should throw an error for a votacao that does not exist', async () => {
            await contract.updateVotacao(ctx, '1003', 'votacao 1003 new value').should.be.rejectedWith(/The votacao 1003 does not exist/);
        });

    });

    describe('#deleteVotacao', () => {

        it('should delete a votacao', async () => {
            await contract.deleteVotacao(ctx, '1001');
            ctx.stub.deleteState.should.have.been.calledOnceWithExactly('1001');
        });

        it('should throw an error for a votacao that does not exist', async () => {
            await contract.deleteVotacao(ctx, '1003').should.be.rejectedWith(/The votacao 1003 does not exist/);
        });

    });

});