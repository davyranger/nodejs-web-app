import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../src/index.js";

chai.use(chaiHttp);
const { expect } = chai;

describe("GET /users", () => {
  it("Should display a list of users, fetched from db", (done) => {
    chai
      .request(app)
      .get("/users")
      .then((res) => {
        expect(res).to.have.status(200); // Ensure successful response
        expect(res).to.be.html; // Ensure response is HTML
        // Verify the presence of individual users in the response
        expect(res.text).to.include("<h3>Fibre Bundle</h3>");
        expect(res.text).to.include("<h3>Quantum Electrodynamics</h3>");
        expect(res.text).to.include("<h3>Feynman Diagram</h3>");
        expect(res.text).to.include("<h3>Differentiable Manifold</h3>");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
