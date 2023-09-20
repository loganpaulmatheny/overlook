const bookingsArea = document.querySelector(".bookings-area");
const costArea = document.querySelector(".total-cost");

const createBookings = (bookings, rooms) => {
  rooms.innerHTML = "";
  bookings.forEach((booking) => {
    let roomInformation = rooms.find((room) => {
      return room.number === booking.roomNumber;
    });
    bookingsArea.innerHTML += `
      <h2>${roomInformation.roomType}</h2>
      <p>Date: ${booking.date}</P>
    `;
  });
};

const updateTotalCost = (total) => {
  costArea.innerHTML = "";
  costArea.innerHTML = `Total Cost to date: $${total}`;
};

// "bookings": [
//   {
//     "id": "5fwrgu4i7k55hl6sz",
//     "userID": 9,
//     "date": "2022/04/22",
//     "roomNumber": 15
//   },

export { createBookings, updateTotalCost };
