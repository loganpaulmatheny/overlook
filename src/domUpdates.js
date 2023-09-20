const bookingsArea = document.querySelector(".bookings-area");
const welcomeMessage = document.querySelector(".welcome");
const userIdMessage = document.querySelector(".userIdMessage");
const costArea = document.querySelector(".total-cost");

const createBookings = (bookings, rooms) => {
  bookingsArea.innerHTML = "";
  bookings.forEach((booking) => {
    let roomInformation = rooms.find((room) => {
      return room.number === booking.roomNumber;
    });
    bookingsArea.innerHTML += `
      <h2>${roomInformation.roomType}</h2>
      <p>Date: ${booking.date}</P>
      <p>Cost per Night: $${roomInformation.costPerNight}</p>
    `;
  });
};

const updateWelcomeUser = (user) => {
  welcomeMessage.innerHTML = `Welcome home ${user.name}`;
  userIdMessage.innerHTML = `User ID: ${user.id}`;
};

const updateTotalCost = (total) => {
  costArea.innerHTML = "";
  costArea.innerHTML = `Total Cost to date: $${total}`;
};

const updateSecondaryCosts = (subTotal, element) => {
  element.innerHTML = `$${subTotal}`;
};

const displayElements = (toDisplays, noDisplays) => {
  toDisplays.forEach((element) => {
    // console.log(element);
    element.classList.toggle("hidden", false);
  });
  noDisplays.forEach((element) => {
    // console.log(element);
    element.classList.toggle("hidden", true);
  });
};

// -display function
// -event listeners, functions, display for past vs. upcoming bookings

export {
  createBookings,
  updateWelcomeUser,
  updateTotalCost,
  updateSecondaryCosts,
  displayElements,
};
