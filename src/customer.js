const getUserBookings = (userId, bookings) => {
  let currentDate = new Date();
  let userBookings = bookings.reduce(
    (acc, cv) => {
      let bookingDate = new Date(cv.date);
      if (bookingDate < currentDate) {
        acc.pastBookings.push(cv);
      } else {
        acc.upcomingBookings.push(cv);
      }
      return acc;
    },
    { pastBookings: [], upcomingBookings: [] }
  );
  sortBookings(userBookings);
  return userBookings;
};

const sortBookings = (bookings) => {
  let bookingKeys = Object.keys(bookings);
  bookingKeys.forEach((typeOfBooking) => {
    let sortedBookings = bookings[typeOfBooking].sort((booking1, booking2) => {
      let date1 = new Date(booking1.date);
      let date2 = new Date(booking2.date);
      return date1 - date2;
    });
    bookings[typeOfBooking] = sortedBookings;
  });
};

const calculateRoomCosts = (typeOfBookings, rooms) => {
  let roomCosts = rooms.reduce((acc, cv) => {
    acc[cv.number] = cv.costPerNight;
    return acc;
  }, {});

  let costOfBookings = typeOfBookings.reduce((acc, cv) => {
    acc += roomCosts[cv.roomNumber];
    return acc;
  }, 0);

  return Math.round(costOfBookings * 100) / 100;
};

// const positionPoints = (playerObject) => {
//   const playerKeys = Object.keys(oldSchoolBasketballPlayers)
//     return playerKeys.reduce((acc, cv) => {
//       if (!acc[playerObject[cv].position]) {
//       acc[playerObject[cv].position] = playerObject[cv].careerPoints;
//       }
//       else {
//         acc[playerObject[cv].position] += playerObject[cv].careerPoints;
//       }
//       return acc
//     }, {})
//   }

// if needed to mainupate todays date.toJSON().slice(0, 10);

export { getUserBookings, calculateRoomCosts };
