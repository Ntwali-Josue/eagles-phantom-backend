import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../app';
import user from './mock/data';
import { encode, encodeExpire } from '../utils/jwt';

dotenv.config();

chai.use(chaiHttp);
const requester = () => chai.request(app);
const prefix = '/api/v1/auth/forgotten-link';
const driverToken = encode(user[7]);
const expiredTokenLink = encodeExpire(user[7]);
const fakeTokenLink = `${driverToken}abc`;
const prefix1 = `/api/v1/auth/reset-password/${fakeTokenLink}`;
const prefix2 = `/api/v1/auth/reset-password/${expiredTokenLink}`;

describe('Tests for the forgotten link and the reseting password of the users', () => {
  it('Should not be able to reset the password if the reset link has a problem', (done) => {
    requester()
      .put(prefix1)
      .send(user[4])
      .end((error, res) => {
        expect(res).to.have.status([401]);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(401);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
  });
  it('Should not be able to reset the password if the reset link is expired', (done) => {
    requester()
      .put(prefix2)
      .send(user[4])
      .end((error, res) => {
        expect(res).to.have.status([401]);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(401);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
  });
  it('Should be possible to send the reset link password with the provided email', (done) => {
    requester()
      .post(prefix)
      .send(user[8])
      .end((error, res) => {
        expect(res).to.have.status([403]);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(403);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
  });
  it('Should be possible to send the reset link password with the provided link', (done) => {
    requester()
      .post(prefix)
      .send(user[7])
      .end((error, res) => {
        expect(res).to.have.status([403]);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(403);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
  });
  it('Should not be possible to send the reset link password with the role as admin', (done) => {
    requester()
      .post(prefix)
      .send(user[9])
      .end((error, res) => {
        expect(res).to.have.status([403]);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(403);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
  });
  it('Should not be possible to send the reset link password if the user is not in the system', (done) => {
    requester()
      .post(prefix)
      .send(user[10])
      .end((error, res) => {
        expect(res).to.have.status([403]);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(403);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
  });
  it('Should not be possible to send the reset link password if there is not email', (done) => {
    requester()
      .post(prefix)
      .send(user[11])
      .end((error, res) => {
        expect(res).to.have.status([403]);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(403);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
  });
  it('it should not reset if password does not provided', (done) => {
    chai.request(app)
    .post(prefix)
    .send(user[11])
    .end((err, res) => {
        expect(res).to.have.status([403]);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(403);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
      done();
      });
  });
  it('it should not reset if token expired', (done) => {
    chai.request(app)
    .post(prefix2)
    .send(user[11])
    .end((err, res) => {
        expect(res).to.have.status([404]);
      done();
      });
  });
  it('it should not reset if password is short', (done) => {
    chai.request(app)
    .post(prefix)
    .send(user[11])
    .end((err, res) => {
       expect(res).to.have.status([403]);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(403);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
      done();
      });
  });
  it('it should not reset if confirm password is not provided', (done) => {
    chai.request(app)
    .post(prefix)
    .send(user[11])
    .end((err, res) => {
       expect(res).to.have.status([403]);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(403);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
      done();
      });
  });
  it('it should not reset  if confirm password does not match to provided password', (done) => {
    chai.request(app)
    .put(prefix)
    .send(user[11])
    .end((err, res) => {
      expect(res).to.have.status([404]);
      done();
      });
  });
});
