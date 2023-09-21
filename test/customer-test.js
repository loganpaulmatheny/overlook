const chai = require("chai");
const expect = chai.expect;

import {
  sampleRoomData,
  sampleBookingsData,
  miniSampleBookingsData,
  roomCostObjectResult,
  currentSampleUser,
  userFourteenBookings,
} from "../data/sample-data";
const {
  calculateRoomCosts,
  roomCosts,
  getUserBookings,
} = require("../src/customer.js");

describe("Room costs", function () {
  it("Should create an single object with the room number as a property and it's value being the cost per night.", function () {
    const roomCostObject = roomCosts(sampleRoomData.rooms);
    expect(roomCostObject).to.deep.equal(roomCostObjectResult);
  });
});

describe("Calculate costs", function () {
  it("Should calculate the cost of one room", function () {
    const totalCostOneRoom = calculateRoomCosts(
      [sampleBookingsData.bookings[0]],
      sampleRoomData.rooms
    );

    expect(totalCostOneRoom).to.equal(295);
  });

  it("Should calculate the cost of multiple room", function () {
    const totalCostOneRoom = calculateRoomCosts(
      miniSampleBookingsData.bookings,
      sampleRoomData.rooms
    );

    expect(totalCostOneRoom).to.equal(794);
  });
});

describe("User bookings", function () {
  it("Should get all of the bookings for a user", function () {
    let currentUser = currentSampleUser;
    const userBookings = getUserBookings(
      currentUser.id,
      sampleBookingsData.bookings
    );

    expect(userBookings).to.deep.equal(userFourteenBookings);
  });
});
