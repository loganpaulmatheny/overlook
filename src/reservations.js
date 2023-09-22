const getAvailableBookings = (date, rooms, bookings) => {
  let bookingsThatDay = bookings.reduce((acc, cv) => {
    let bookingDate = new Date(cv.date);
    if (bookingDate.getTime() === date.getTime()) {
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

const filterAvailableRooms = (tagId, rooms) => {
  return rooms.filter((room) => {
    let roomType = room.roomType.split(" ").join("");
    if (tagId === "all") {
      return room;
    } else if (tagId === roomType) {
      return room;
    }
  });
};

export { getAvailableBookings, filterAvailableRooms };
