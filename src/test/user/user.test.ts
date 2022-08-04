import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../..';

const expect = chai.expect;
chai.use(chaiHttp);

const userLoginURL = "/api/v1/auth/login"
const userRegisterURL = "/api/v1/auth/register"

describe("AUTHENTICATION API TESTING", () => {

  it("LOGIN USER", () => {
    chai
      .request(app)
      .post(userLoginURL)
      .type('form')
      .send({
        'email': 'aguspray00123@gmail.comidd',
        'password': '123456d'
      })
      .end((err, res) => {
        expect(err).to.be.null
        expect(res.body).to.be.an('object')
        expect(res.body.data).to.be.a('string')
        expect(res.body).to.have.property('data')
        expect(res.body).to.have.property('message')
        expect(res.body).to.have.property('status')
      });
  });

  it("ALREADY REGISTERED USER", () => {
    chai
      .request(app)
      .post(userRegisterURL)
      .type('form')
      .send({
        'email': 'aguspray00123@gmail.comidd',
        'password': '123456d'
      })
      .end((err, res) => {
        expect(res.body.code).to.be.equal(500)
        expect(res.body).to.be.an('object')
        expect(res.body.message).to.be.a('string')
        expect(res.body.message).to.be.equal('User email is already existing')
      });
  });

  // it("ALREADY NEW USER", () => {
  //   chai
  //     .request(app)
  //     .post(userRegisterURL)
  //     .type('form')
  //     .send({
  //       'name': 'agus',
  //       'email': 'aguspray@gmail.com',
  //       'password': '123456d'
  //     })
  //     .end((err, res) => {
  //       console.log(res.body)
  //       expect(err).to.be.null
  //       expect(res.body).to.be.an('object')
  //       expect(res.body.data).to.be.a('object')
  //       expect(res.body.data).to.be.a('object').lengthOf(6)
  //       expect(res.body.message).to.equal('Success create user account')
  //     });
  // });
});
