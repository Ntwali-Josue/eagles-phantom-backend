import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';

chai.use(chaiHttp);
describe('Sign in route', () => {
  it('check user info', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .end((err, res) => {
        expect(res).to.have.status(500);
        expect(res).to.have.property('status');
        expect(res.body).to.have.status([500]);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(500)
        done();
      });
  });
  it('should not logIn if email is not provided', (done) => {
    chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email:' ',
          password:'admin'
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.message).to.equals('The user with this email does not exist');
          expect(res.body).to.have.status([404]);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(404);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
          done();
        });
  });
  it('should not login if email is wrong', (done) => {
    chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email:'sh@gmail.com',
          password:'admin'
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.message).to.equals('The user with this email does not exist');
          expect(res.body).to.have.status([404]);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(404);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
          done();
        });
  });
  it('Log in the user', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'Josh@gmail.com',
        password: 'admin',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.have.property('status');
        expect(res.body).to.have.status([200]);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(200);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done();
      });
  });
  it('checkUser password is invalid', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'Josh@gmail.com',
        password: 'admin2',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.have.property('status');
        expect(res.body).to.have.status([400]);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done();
      });
  });
    it("welcome message for login", done => {
      chai
        .request(app)
        .get("/")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.equals('Welcome to phantom, a platform to facilitate the transportation mode in town!.');
          expect(res.body).to.have.status([200]);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(200);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
          done();
          });
      });
});
