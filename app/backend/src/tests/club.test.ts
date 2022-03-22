
  
import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Club from '../database/models/Club';
import { clubsResponse, oneClubMock } from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /clubs', () => {
  
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Club, "findAll")
      .resolves(clubsResponse as Club[]);
  });

  after(()=>{
    (Club.findAll as sinon.SinonStub).restore();
  })

  it('Verifica todos os clubes são retornados', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/clubs')
       .send(clubsResponse)
       
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.deep.equal(clubsResponse);
    
  });
});

describe('Rota /clubs/:id', () => {
  
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Club, "findOne")
      .resolves(oneClubMock as Club);
  });

  after(()=>{
    (Club.findOne as sinon.SinonStub).restore();
  })

  it('Verifica se é retornado o clube esperado', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/clubs/:id')
       .send(oneClubMock)
       
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.deep.equal(oneClubMock);
  });
});