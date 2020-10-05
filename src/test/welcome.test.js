import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';


import app from '../app';

chai.use(chaiHttp);

describe('Server!', () => {
  it('the api testing', (done) => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equals('Welcome to phantom, a platform to facilitate the transportation mode in town!.');
        expect(res).to.have.status([200]);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(200);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done();
      });
  });
  
  describe('/all unspecified routes', () => {
    it('it should give error to unspecified routes', (done) => {
      chai.request(app)
        .get('/hutd4gg')
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          done();
        });
    });
  });
});
