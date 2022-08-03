import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../../src';

const expect = chai.expect;
chai.use(chaiHttp);

describe("API ENDPOINT TESTING", () => {
  it("GET USER", () => {
    chai
      .request(app)
      .get("/api/v1/")
      .end((err, res) => {
        expect(err).to.be.null
      });
  });

  it("POST USER", () => {
    chai
      .request(app)
      .get("/api/v1/")
      .end((err, res) => {
        expect(err).to.be.null
      });
  });
});
