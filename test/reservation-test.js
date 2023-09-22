const chai = require("chai");
const expect = chai.expect;

import {
  sampleRoomData,
  sampleBookingsData,
  availableRoomsResult,
  allRoomsBooked,
  filterSuitesResult,
} from "../data/sample-data";
import {
  filterAvailableRooms,
  getAvailableBookings,
} from "../src/reservations";

describe("Get available bookings", function () {
  it("Should get all available bookings for a given day", function () {
    let reservationDate = new Date(
      "Fri Apr 21 2022 20:00:00 GMT-0400 (Eastern Daylight Time)"
    );
    reservationDate.setHours(reservationDate.getHours() + 4);

    let availableBookings = getAvailableBookings(
      reservationDate,
      sampleRoomData.rooms,
      sampleBookingsData.bookings
    );

    expect(availableBookings).to.deep.equal(availableRoomsResult);
  });

  it("Should return a blank array if no rooms are available on a certain date", function () {
    let reservationDate = new Date(
      "Fri Apr 21 2022 20:00:00 GMT-0400 (Eastern Daylight Time)"
    );
    reservationDate.setHours(reservationDate.getHours() + 4);

    let availableBookings = getAvailableBookings(
      reservationDate,
      sampleRoomData.rooms,
      allRoomsBooked.bookings
    );

    expect(availableBookings).to.deep.equal([]);
  });
});

describe("Filter bookings by roomType", function () {
  it("Should filter the bookings by roomtype", function () {
    let filteredRooms = filterAvailableRooms("suite", availableRoomsResult);

    expect(filteredRooms).to.deep.equal(filterSuitesResult);
  });

  it("If there are no rooms matching the filter it should return an empty array", function () {
    let filteredRooms = filterAvailableRooms("suite", []);

    expect(filteredRooms).to.deep.equal([]);
  });
});
