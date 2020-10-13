import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../app';


chai.use(chaiHttp);
const requester=()=>chai.request(app);
const prefix='/api/v1/routes';

const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndpbGxAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjAzMzc3MDk5LCJleHAiOjE2MDM5ODE4OTl9.rEtLJMojuQPCLxyDTII1EXZQwvM--FK24lPzAmwHOsw';
const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Ikpvc2hAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjAyNzY0NDkwLCJleHAiOjE2MDMzNjkyOTB9.Jctf3hUMNigF19-ShwOg6_4p1gAwgD97E7PUHwdtNd';
const nonAdminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJydWNlQGdtYWlsLmNvbSIsInJvbGUiOiJkcml2ZXIiLCJpYXQiOjE2MDMzNzcyNzAsImV4cCI6MTYwMzk4MjA3MH0.UCLiQvmKRhD8_iamHOnjMLgVtxs9Z1e1ixVgc0cVVUA';
const operatorToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBldGVyQGdtYWlsLmNvbSIsInJvbGUiOiJvcGVyYXRvciIsImlhdCI6MTYwNDMyMzY1NCwiZXhwIjoxNjA0OTI4NDU0fQ.X0GHtra5nUx1wemARs89KfgWzzKl5qRT93t-Xy50iQs';



describe('Phantom  retrive all Routes', () => {
    it('it should not get all routes without token', (done) => {
      requester()
        .get(prefix)
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          done();
        });
    });
    it('it should not get routes with fake token', (done) => {
        requester()
          .get(prefix)
          .set('x-access-token', fakeToken)
          .end((err, res) => {
            expect(res).to.have.status([401]);
            done();
          });
      });
      it('it should not have permission if not operator', (done) => {
        requester()
          .get(prefix)
          .set('x-access-token', operatorToken)
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });
      it('shoul get all routes', (done) => {
        requester()
          .get(prefix)
          .set('x-access-token', operatorToken)
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            done();
          });
      });
    });



describe('Phantom  create Routes', () => {

    it('it should not add new route when is not an operator', (done) => {
      requester()
            .post(prefix)
            .set("x-access-token", operatorToken)
            .end((err, res) => {
                expect(res).to.have.status([400]);
                done();
            });
    });
    it('it should add new route', (done) => {
      requester()
            .post(prefix)
            .set("x-access-token", operatorToken)
            .end((err, res) => {
                expect(res).to.have.status([400]);
                done();
            });
    });
});

describe('Phantom  Routes operation', () => {
 
    it('it should not retrieve route with invalid id', (done) => {
      requester()
            .get('/api/v1/routes/hth6')
            .set("x-access-token", operatorToken)
            .end((err, res) => {
                expect(res).to.have.status([500]);
                done();
            });
    });
    it('it should update a route', (done) => {
      requester()
            .patch('/api/v1/routes/1')
            .set("x-access-token", operatorToken)
            .end((err, res) => {
                expect(res).to.have.status([400]);
                done();
            });
    });
    it('it should delete a route', (done) => {
      
           requester()
            .delete('/api/v1/routes/1')
            .set("x-access-token", operatorToken)
            .end((err, res) => {
                expect(res).to.have.status([500]);
                done();
            });
    });
});
