// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('Countries', () => {
    describe('GET /', () => {
        // Test to get all students record
        it('should return all countries', (done) => {
            chai.request(app)
                .get('/api/country')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    chai.assert.isAtLeast(res.body.results.length, 209);
                    chai.assert.isAtMost(res.body.results.length, 250);
                    done();
                });
        });
    });
});

describe('Continents', () => {
    describe('GET /', () => {
        // Test to get all students record
        it('should return all continents', (done) => {
            chai.request(app)
                .get('/api/continent')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    chai.assert.isAtLeast(res.body.results.length, 2);
                    chai.assert.isAtMost(res.body.results.length, 12);
                    done();
                });
        });
    });
});