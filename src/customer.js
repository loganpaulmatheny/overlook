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

// if needed to mainupate todays date.toJSON().slice(0, 10);

export { getUserBookings };
