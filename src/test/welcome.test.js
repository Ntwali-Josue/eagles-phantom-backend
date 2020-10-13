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
        done();
      });
  });
});
