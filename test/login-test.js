const chai = require("chai");
const expect = chai.expect;

import { checkUsername, checkPassword } from "../src/login";


describe("Username", function () {
  it("Should check when a username is correct", function () {
    const successfulLogin = checkUsername("customer14");
    expect(successfulLogin).to.equal(true);
  });
});