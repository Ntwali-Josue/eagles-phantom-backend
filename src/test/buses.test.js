import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../app';


chai.use(chaiHttp);
const requester=()=>chai.request(app);



describe('Phantom  retrive bus', () => {
    it('it should not get all routes without valid Plate Number', (done) => {
      requester()
        .get('/api/v1/buses/456')
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          done();
        });
    });
    it('shoul get bus', (done) => {
        requester()
          .get('/api/v1/buses/RAD467B')
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            done();
          });
      });

});