const chai = require("chai");
const expect = chai.expect;

import {
  currentSampleUser,
  roomCostObjectResult,
  sampleRoomData,
  miniSampleBookingsData,
  sampleBookingsData,
  userFourteenBookings,
  userFourteenBookingsMixedUp,
} from "../data/sample-data";

const {
  calculateRoomCosts,
  roomCosts,
  getUserBookings,
  sortBookings,
} = require("../src/customer.js");

describe("Room costs", function () {
  it("Should create a single object with the room numbers properties and their values being the cost per night.", function () {
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

  it("Should return an obect with blank arrays if no bookings are found", function () {
    let currentUser = {
      id: 1007,
      name: "Logan Bond",
    };
    const userBookings = getUserBookings(
      currentUser.id,
      sampleBookingsData.bookings
    );

    expect(userBookings).to.deep.equal({
      pastBookings: [],
      upcomingBookings: [],
    });
  });
});

describe("Sort bookings", function () {
  it("Should sort the bookings from oldest to newest", function () {
    let sortedBookings = sortBookings(userFourteenBookingsMixedUp);

    expect(sortedBookings).to.deep.equal(userFourteenBookings);
  });
});
