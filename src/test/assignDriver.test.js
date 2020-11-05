import chai, { expect } from 'chai';
import chaiHttp from "chai-http";
import { describe, it } from 'mocha';
import userMock from './mock/userMock';
import app from "../app";


chai.use(chaiHttp);

const busId=2
describe('PHANTOM API - TEST BUS', () => {
    it('it should not assign driver due to validation', (done) => {
        
        chai.request(app)
            .patch('/api/v1/assignDriver/' + busId)
            .set("x-access-token", userMock.token.operator)
            .send({"email": "kamaligmail.com"})
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                done();
            });
    });

    it('it should not assign driver due to email not found', (done) => {
        
        chai.request(app)
            .patch('/api/v1/assignDriver/' + busId)
            .set("x-access-token", userMock.token.operator)
            .send({"email": "kamali@gmail.com"})
            .end((err, res) => {
                expect(res.statusCode).to.equal(404);
                done();
            });
    });

    it('it should not assign driver due to incorrect role', (done) => {
        
        chai.request(app)
            .patch('/api/v1/assignDriver/' + busId)
            .set("x-access-token", userMock.token.operator)
            .send({"email": "Josh@gmail.com"})
            .end((err, res) => {
                expect(res.statusCode).to.equal(401);
                done();
            });
    });

    
    it('it should  assign driver', (done) => {
        let Id=1
        chai.request(app)
            .patch('/api/v1/assignDriver/' + Id)
            .set("x-access-token", userMock.token.operator)
            .send({"email": "mugema8@gmail.com"})
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                done();
            });
    });

    it('it should not assign driver if driver is already assigned', (done) => {
    
        chai.request(app)
            .patch('/api/v1/assignDriver/' + busId)
            .set("x-access-token", userMock.token.operator)
            .send({"email": "mugema8@gmail.com"})
            .end((err, res) => {
                expect(res.statusCode).to.equal(409);
                done();
            });
    });
    
    
    it('it should not assign driver if bus is already assigned', (done) => {
    let Id=1
        chai.request(app)
            .patch('/api/v1/assignDriver/' + Id)
            .set("x-access-token", userMock.token.operator)
            .send({"email": "mugema@gmail.com"})
            .end((err, res) => {
                expect(res.statusCode).to.equal(409);
                done();
            });
    });

    it('it should not unassign driver if driver is not assigned', (done) => {
        let Id=1
            chai.request(app)
                .patch('/api/v1/unassignDriver/' + Id)
                .set("x-access-token", userMock.token.operator)
                .send({"email": "mugema@gmail.com"})
                .end((err, res) => {
                    expect(res.statusCode).to.equal(401);
                    done();
                });
        });

        it('it should unassign driver', (done) => {
            let Id=1
                chai.request(app)
                    .patch('/api/v1/unassignDriver/' + Id)
                    .set("x-access-token", userMock.token.operator)
                    .send({"email": "mugema8@gmail.com"})
                    .end((err, res) => {
                        expect(res.statusCode).to.equal(200);
                        done();
                    });
            });

            it('it should not retrieve assigned buses when page not found', (done) => {
                chai.request(app)
                    .get('/api/v1/assignedbuses')
                    .set("x-access-token", userMock.token.operator)
                    .end((err, res) => {
                        expect(res.statusCode).to.equal(404);
                        done();
                    });
            });


            // it('it should not retrieve assigned buses when limit is undefined', (done) => {
            //     chai.request(app)
            //         .get('/api/v1/assignedbuses')
            //         .set("x-access-token", userMock.token.operator)
            //         .end((err, res) => {
            //             expect(res.statusCode).to.equal(500);
            //             done();
            //         });
            // });

})
