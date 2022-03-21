import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';

import { Response } from 'superagent';
import { successLoginData, successUserMock, unsuccessLoginData, unsuccessPassword, unsuccesUserMock } from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /login', () => {

  describe('Verifica se é possível fazer login com os dados corretos', () => {
    let chaiHttpResponse: Response;

    const response = {
      user: {
        id: 1,
        username: 'Admin',
        role: 'admin',
        email: 'admin@admin.com',
      },
      token: '123.456.789',
    };

    before(async () => {
      sinon.stub(User, 'findOne').resolves(successUserMock as User);
      chaiHttpResponse = await chai.request(app).post('/login').send(successLoginData);
    });

    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    });

    it('Recebe status 200, ao fazer login com dados corretos', async () => {
      expect(chaiHttpResponse.status).to.be.eq(200);
    });

    it('A resposta recebe um user e um token', () => {
      expect(chaiHttpResponse.body).to.have.keys(['token', 'user']);
    });

    it('A resposta tem user no formato adequado', () => {
      expect(chaiHttpResponse.body.user).to.be.deep.equal(response.user);
    });
  });

  describe('Verifica que não é possível logar com um email invalido', () => {
    let chaiHttpResponse: Response;

    const message = 'Incorrect email or password';

    before(async () => {
      sinon.stub(User, 'findOne').resolves(null);
      chaiHttpResponse = await chai.request(app).post('/login').send(unsuccessLoginData);
    });

    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    });

    it('Recebe um status 401 quando o email é invalido', () => {
      expect(chaiHttpResponse.status).to.be.eq(401);
    });
  });

  describe('Verifica que não é possível logar com uma senha menor que 7', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon.stub(User, 'findOne').resolves(null);
      chaiHttpResponse = await chai.request(app).post('/login').send(unsuccessPassword);
    });

    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    });

    it('Recebe um status 401 quando a senha é menor que 7', () => {
      expect(chaiHttpResponse.status).to.be.eq(401);
    });
  });

  describe('Verifica que não é possível fazer login sem informar um email', () => {
    let chaiHttpResponse: Response;

    const loginData = {
      password: '123456',
    };

    const message = 'All fields must be filled';

    before(async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send(loginData);
    });

    it('Recebe um status 401 quando o email não é informado', () => {
      expect(chaiHttpResponse.status).to.be.eq(401);
    });

    it('Recebe a mensagem correta quando o email não é informado', () => {
      expect(chaiHttpResponse.body).to.be.deep.equal({ message });
    });
  });

  describe('Verifica que não é possível fazer login sem informar uma senha', () => {
    let chaiHttpResponse: Response;

    const loginData = {
      email: 'admin@admin.com',
    };

    const message = 'All fields must be filled';

    before(async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send(loginData);
    });

    it('Recebe um status 401 quando a senha não é informada', () => {
      expect(chaiHttpResponse.status).to.be.eq(401);
    });

    it('Recebe a mensagem correta quando a senha não é informada', () => {
      expect(chaiHttpResponse.body).to.be.deep.equal({ message });
    });
  });
});