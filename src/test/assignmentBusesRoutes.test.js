import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../app';
import user from './mock/data';
import { encode } from '../utils/jwt';

dotenv.config();

chai.use(chaiHttp);
const requester = () => chai.request(app);
const prefix1 = `/api/v1/assignment/${200}`;
const prefix2 = `/api/v1/assignment/${1}`;
const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Ikpvc2hAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjAyNzY0NDkwLCJleHAiOjE2MDMzNjkyOTB9.Jctf3hUMNigF19-ShwOg6_4p1gAwgD97E7PUHwdtNd';
const operatorToken = encode(user[12]);
const expiredToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Ikpvc2hAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjAyNzY0NDkwLCJleHAiOjE2MDMzNjkyOTB9.Jctf3hUMNigF19-ShwOg6_4p1gAwgD97E7PUHwdtNd';

describe('Tests for the assignment of buses to routes and getting the assigned buses', () => {
  it('Operator should not be able to assign any bus to a route if there is no bus is not in the system', (done) => {
    requester()
      .patch(prefix1)
      .set('x-access-token', operatorToken)
      .send(user[16])
      .end((error, res) => {
        expect(res).to.have.status([403]);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(403);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
  });
  it('Operator should not be able to assign any bus to a route if token expired', (done) => {
    requester()
      .patch(prefix1)
      .set('x-access-token', expiredToken)
      .end((error, res) => {
        expect(res).to.have.status([401]);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(401);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
  });
  it('Operator should n be able to assign any bus to a route if token is by operator', (done) => {
    requester()
      .patch(prefix1)
      .set('x-access-token', operatorToken)
      .end((error, res) => {
        expect(res).to.have.status([403]);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(403);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
  });
  it('Operator should not be able to assign any bus to a route with fake token', (done) => {
    requester()
      .patch(prefix1)
      .set('x-access-token', fakeToken)
      .send(user[16])
      .end((error, res) => {
        expect(res).to.have.status([401]);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(401);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
  });
  it('Operator should not be able to assign any bus to a route without token', (done) => {
    requester()
      .patch(prefix1)
      .send(user[16])
      .end((error, res) => {
        expect(res).to.have.status([401]);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(401);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
  });
  it('Operator should not be able to assign any bus to a route if there is no route is not in the system', (done) => {
    requester()
      .patch(prefix2)
      .set('x-access-token', operatorToken)
      .send(user[17])
      .end((error, res) => {
        expect(res).to.have.status([403]);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(403);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
  });
  it('Operator should be able to assign a bus to a route if the bus and the route exist', (done) => {
    requester()
      .patch(prefix2)
      .set('x-access-token', operatorToken)
      .send(user[16])
      .end((error, res) => {
        expect(res).to.have.status([403]);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(403);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
  });
});
