import chai,{ expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import userMock from './mock/userMocks'

chai.use(chaiHttp);
let signinToken = ''
before((done) => {
  chai.request(app)
  .post('/api/v1/auth/login')
  .send({
    email:"Josh@phantom.com",
    password:"admin"
  })
  .end((err, res) => {
    signinToken = res.body.Token 
    done()
  });
});
describe('/GET Logout user', () => {
  it('it should check if token provided is correct', (done) => {
    //change U to V
    //let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjAzMTIzMTU0LCJleHAiOjE2MDMyMDk1NTR9.KCyeLBROzanYfDHIT0KelXAaHIQ_rinOKGN4YjedL0k"
    chai.request(app)
        .get('/api/v1/auth/logout')
        .set("Authorization", "Bearer " + userMock.token.admin)
        .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            done();
        });
  });
  it('it should check if token provided is incorrect', (done) => {
    //change U to V
    let token = 'abeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6MiwiaWF0IjoxNjAyNTgyODk3LCJleHAiOjE2MTAzNTg4OTd9ZfmkO5AMIU-G-rcpFA1VS2ESHiKoehfcCGlwf64hspw'
    chai.request(app)
        .get('/api/v1/auth/logout')
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
            expect(res.statusCode).to.equal(403);
            done();
        });
});
});