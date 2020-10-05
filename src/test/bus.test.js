import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import bus from './mock/busData';
import user from './mock/data';
import { encode } from '../utils/jwt';

chai.use(chaiHttp);
const adminToken = encode(user[3]);
const fakeToken = `${adminToken}ab`;
const expiredToken=`${adminToken}bhy`;
const nonAdminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJydWNlQGdtYWlsLmNvbSIsInJvbGUiOiJkcml2ZXIiLCJpYXQiOjE2MDMzNzcyNzAsImV4cCI6MTYwMzk4MjA3MH0.UCLiQvmKRhD8_iamHOnjMLgVtxs9Z1e1ixVgc0cVVUA';

describe('Buses', () => {
  it('deny the permission if there\'s no token', (done) => {
    chai
      .request(app)
      .post('/api/v1/buses')
      .send(bus)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.message).to.eqls('Please login');
        expect(res).to.have.property('status');
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eql(401);
        expect(res.body.message).to.be.a('string');
        done();
      });
  });
  it('it should not get buses if token expired', (done) => {
    chai.request(app)
    .post('/api/v1/buses')
    .set('x-access-token', expiredToken)
    .end((err, res) => {
        expect(res).to.have.status([401]);
        expect(res).to.have.property('status');
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eql(401);
        expect(res.body.message).to.be.a('string');
      done();
      });
  });
  it('it should not get buses if non admin token', (done) => {
    chai.request(app)
    .post('/api/v1/buses')
    .set('x-access-token', nonAdminToken)
    .end((err, res) => {
        expect(res).to.have.status([401]);
        expect(res).to.have.property('status');
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eql(401);
        expect(res.body.message).to.be.a('string');
      done();
      });
  });
  it('Should not be possible to do any task with a fake token', (done) => {
    chai
      .request(app)
      .post('/api/v1/buses')
      .set('x-access-token', fakeToken)
      .send(bus)
      .end((error, res) => {
        expect(res).to.have.status([401]);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(401);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
  });
  it('create bus', (done) => {
    chai
      .request(app)
      .post('/api/v1/buses')
      .set('x-access-token', adminToken)
      .send(bus)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.have.property('status');
        expect(res.body).to.be.an('object');
        done(err);
      });
  });
  it('it should not create buses if non admin token', (done) => {
    chai.request(app)
    .post('/api/v1/buses')
    .set('x-access-token', nonAdminToken)
    .end((err, res) => {
        expect(res).to.have.status([401]);
        expect(res).to.have.property('status');
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eql(401);
        expect(res.body.message).to.be.a('string');
      done();
      });
  });
  it('get all buses', (done) => {
    chai
      .request(app)
      .get('/api/v1/buses?page=1&limit=10')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.have.property('status');
        expect(res.body).to.be.an('object');
        done(err);
      });
  });
  it('shouldn\'t get bus by id if the bus doesn\'t exist in the system', (done) => {
    chai
      .request(app)
      .get('/api/v1/buses/100')
      .set('x-access-token', adminToken)
      .set('request.params', 100)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res).to.have.property('status');
        expect(res.body.status).to.eql(401);
        expect(res.body.message).to.be.a('string');
        done(err);
      });
  });
  it('get bus by id', (done) => {
    chai
      .request(app)
      .get('/api/v1/buses/1')
      .set('x-access-token', adminToken)
      .set('request.params', 1)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.have.property('status');
        expect(res.body.status).to.eql(200);
        expect(res.body.message).to.be.a('string');
        done(err);
      });
  });
  it('can not get bus by id when is invalid', (done) => {
    chai
      .request(app)
      .get('/api/v1/buses/yuu')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.have.property('status');
        expect(res.body.status).to.eql(400);
        expect(res.body.message).to.be.a('string');
        done(err);
      });
  });
  it('update bus', (done) => {
    chai
      .request(app)
      .patch('/api/v1/buses/1')
      .set('x-access-token', adminToken)
      .set('request.params', 1)
      .send({
        busId: 1,
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.have.property('status');
        done();
      });
  });
  it('it should not update buses if non admin token', (done) => {
    chai.request(app)
    .post('/api/v1/buses')
    .set('x-access-token', nonAdminToken)
    .end((err, res) => {
        expect(res).to.have.status([401]);
      done();
      });
  });
  it('should not update bus if invalid id', (done) => {
    chai
      .request(app)
      .delete('/api/v1/buses/yuu')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done();
      });
  });
  it('delete buses', (done) => {
    chai
      .request(app)
      .delete('/api/v1/buses/1')
      .set('x-access-token', adminToken)
      .set('request.params', 1)
      .send({
        busId: 1,
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done();
      });
  });
  it('it should not delete buses if non admin token', (done) => {
    chai.request(app)
    .post('/api/v1/buses')
    .set('x-access-token', nonAdminToken)
    .end((err, res) => {
        expect(res).to.have.status([401]);
      done();
      });
  });
  it('should not delete bus if it does not exist in the system', (done) => {
    chai
      .request(app)
      .delete('/api/v1/buses/101')
      .set('x-access-token', adminToken)
      .set('request.params', 101)
      .send({
        busId: 101,
      })
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done();
      });
  });
  it('should not delete bus if invalid id', (done) => {
    chai
      .request(app)
      .delete('/api/v1/buses/yuu')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done();
      });
  });
});
