const getAvailableBookings = (date, rooms, bookings) => {
  let bookingsThatDay = bookings.reduce((acc, cv) => {
    let bookingDate = new Date(cv.date);
    if (bookingDate.getTime() === date.getTime()) {
      console.log("date match");
      acc.push(cv.roomNumber);
    }
    return acc;
  }, []);
  let roomsAvailable = rooms.reduce((acc, cv) => {
    if (!bookingsThatDay.includes(cv.number)) {
      acc.push(cv);
    }
    return acc;
  }, []);
  return roomsAvailable;
};

// -GOAL create an array of objects that 'could be' picked because theirs no bookings on that day
// -create function that filters all the bookings for a given day
// -then compare the total list of rooms with that filtered list of bookings between their ids -- if there's no id match create the appropriate booking object and stick it in an array
// -make this available rooms global
export { getAvailableBookings };
