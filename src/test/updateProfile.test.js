import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import { describe, it } from 'mocha';
import { encode } from '../utils/jwt';
import data from './mock/updateData';
import app from '../app';
import user from './mock/data';

dotenv.config();

chai.use(chaiHttp);

const prefix = '/api/v1/auth/updateProfile';

const driverToken = encode(user[7]);

describe(' Test update profile', () => {
  it('Should not update user if firstname is empty ', (done) => {
    chai
      .request(app)
      .patch(prefix)
      .set('x-access-token', driverToken)
      .send(data.firstnameIsEmpty)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('Should not update user if lastname is empty ', (done) => {
    chai
      .request(app)
      .patch(prefix)
      .set('x-access-token', driverToken)
      .send(data.lastnameIsEmpty)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('Should not update user if firstname or lastname is shorter than 5 chars ', (done) => {
    chai
      .request(app)
      .patch(prefix)
      .set('x-access-token', driverToken)
      .send(data.isShort)
      .end((err, res) => {
        expect(res).to.have.status(400)
        done();
      });
  });

  it('Should not update if no valid email is provided', (done) => {
    chai
      .request(app)
      .patch(prefix)
      .set('x-access-token', driverToken)
      .send(data.isAnEmail)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('Should not update user if email is empty string ', (done) => {
    chai
      .request(app)
      .patch(prefix)
      .set('x-access-token', driverToken)
      .send(data.emailEmpty)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('Should not update user if gender is longer than eight chars ', (done) => {
    chai
      .request(app)
      .patch(prefix)
      .set('x-access-token', driverToken)
      .send(data.isBig)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('Should not update user if gender empty string ', (done) => {
    chai
      .request(app)
      .patch(prefix)
      .set('x-access-token', driverToken)
      .send(data.genderEmpty)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('Should not update user if no birthdate is invalid', (done) => {
    chai
      .request(app)
      .patch(prefix)
      .set('x-access-token', driverToken)
      .send(data.invalidDate)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('Should not update user if birthdate is empty', (done) => {
    chai
      .request(app)
      .patch(prefix)
      .set('x-access-token', driverToken)
      .send(data.emptyDate)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});
