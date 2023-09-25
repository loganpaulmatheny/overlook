const chai = require("chai");
const expect = chai.expect;

import { checkUsername, checkPassword } from "../src/login";

describe("Username", function () {
  it("Should check when a username is correct", function () {
    const successfulLogin = checkUsername("customer14");
    expect(successfulLogin).to.equal(true);
  });

  it("Should check when a username is incorrect with a number outside of required range", function () {
    const successfulLogin = checkUsername("customer150");
    expect(successfulLogin).to.equal(false);
  });

  it("Should check when a username is in the wrong format", function () {
    const successfulLogin = checkUsername("blah blah 14");
    expect(successfulLogin).to.equal(false);
  });
});

describe("Password", function () {
  it("Should check when a password is correct", function () {
    const successfulLogin1 = checkPassword("overlook2021");
    const successfulLogin2 = checkPassword("overlook2023");
    expect(successfulLogin1).to.equal(true);
    expect(successfulLogin2).to.equal(true);
  });

  it("Should check when a password is incorrect", function () {
    const successfulLogin = checkUsername("blahblah2023");
    expect(successfulLogin).to.equal(false);
  });
});
