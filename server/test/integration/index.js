import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../../src/index.js";

chai.use(chaiHttp);
chai.should();

describe("GET /users", () => {
  it("Should display a list of users, fetched from db", (done) => {
    chai
      .request(app)
      .get("/users")
      .then((res) => {
        expect(res).to.be.html;
        res.text.should.match(/<h3.*>Rapidcode Users<\/h3>/g); // Updated to match <h3> tag
        res.text.should.match(/<h3.*>.*<\/h3>/g); // Expecting <h3> tags for users
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
