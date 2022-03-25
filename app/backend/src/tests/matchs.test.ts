import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/Match';

import { Response } from 'superagent';
import { createMatchMock, matchsIsInProgressMock, matchsMock } from './mocks';
import { CreateMatchI, MatchI } from '../interfaces/Interfaces';
import { expect } from 'chai';

chai.use(chaiHttp);

describe('Rota /matchs', () => {
  describe('testa a rota /matchs', () => {
    let chaiHttpResponse: Response;
  
    before(async () => {
      sinon
        .stub(Match, "findAll")
        .resolves(matchsMock as MatchI[] );
    });
  
    after(()=>{
      (Match.findAll as sinon.SinonStub).restore();
    })
  
    it('Verifica o retorno esperado', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .get('/matchs')
         .send(matchsMock)
         
      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.deep.equal(matchsMock);
    });
  })

  describe('Testa a rota /matchs inProgress', () => {
  
    let chaiHttpResponse: Response;
  
    before(async () => {
      sinon
        .stub(Match, "findAll")
        .resolves(matchsIsInProgressMock as MatchI[] );
    });
  
    after(()=>{
      (Match.findAll as sinon.SinonStub).restore();
    })
  
    it('get/matchs/?inProgress=true, verifica se retorna as partidas em andamento', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .get('/matchs?inProgress=true')
         .send()
         
      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.deep.equal(matchsIsInProgressMock);
    })
  })

  describe('Testa a rota post /matchs', () => {
  
    let chaiHttpResponse: Response;
  
    before(async () => {
      sinon
        .stub(Match, "create")
        .resolves(createMatchMock as CreateMatchI);
    });
  
    after(()=>{
      (Match.create as sinon.SinonStub).restore();
    })
  
    it('post/matchs, verifica o retorno em caso de sucesso', async () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJpYXQiOjE2NDgwMzcxMjd9.5jyiifXyBSxl6X8_5Cs2Bl2B6BiEKT0tQRUN8VUi9vU'
      chaiHttpResponse = await chai
         .request(app)
         .post('/matchs')
         .set({'Authorization': token})
         .send(createMatchMock)
         
      expect(chaiHttpResponse).to.have.status(201);
      expect(chaiHttpResponse.body).to.deep.equal(createMatchMock);
      
    });
  });
})