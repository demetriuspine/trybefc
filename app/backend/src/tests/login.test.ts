
  
import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import User from '../database/models/User';
import {roleUser, successUserMock, unsuccessUserMock} from './mocks';


chai.use(chaiHttp);

const { expect } = chai;

describe('Login route tests', () => {
  
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(successUserMock as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('POST method /login success', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(successUserMock)
       
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.a('object');
    expect(chaiHttpResponse.body).to.include.all.keys('user','token');
  });

  it('POST method /login unsuccess', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(unsuccessUserMock)
       
    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse.body).to.be.a('object');
    expect(chaiHttpResponse.body).to.include.all.keys('message');
  });
});