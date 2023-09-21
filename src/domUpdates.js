const bookingsArea = document.querySelector(".bookings-area");
const welcomeMessage = document.querySelector(".welcome");
const userIdMessage = document.querySelector(".userIdMessage");
const costArea = document.querySelector(".total-cost");
const availableRoomsArea = document.querySelector(".available-rooms");
const upcomingCostsAmount = document.querySelector(".upcoming-costs-amount");
const pastCostsAmount = document.querySelector(".past-costs-amount");

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

const createAvailableRooms = (availableRooms) => {
  availableRoomsArea.innerHTML = "";
  if (availableRooms.length === 0) {
    availableRoomsArea.innerHTML += `
    <h2>I'm sincerely sorry, there are no more available bookings that day</h2>
    `;
  } else {
    availableRooms.forEach((availableRoom) => {
      availableRoomsArea.innerHTML += `
      <div id="${availableRoom.number}"> 
        <h2>Room Type: ${availableRoom.roomType}</h2>
        <p>Room Number: ${availableRoom.number}</p>
        <p>Beds: ${availableRoom.numBeds} x ${availableRoom.bedSize}</p>
        <p>Cost per Night: $${availableRoom.costPerNight}</p>
      </div>
      `;
    });
  }
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

const updateUserElements = (currentUser, totalCost, pastCost, upcomingCost) => {
  updateWelcomeUser(currentUser);
  updateTotalCost(totalCost);
  updateSecondaryCosts(pastCost, pastCostsAmount);
  updateSecondaryCosts(upcomingCost, upcomingCostsAmount);
};

const displayElements = (toDisplays, noDisplays) => {
  toDisplays.forEach((element) => {
    element.classList.toggle("hidden", false);
  });
  noDisplays.forEach((element) => {
    element.classList.toggle("hidden", true);
  });
};

export {
  createBookings,
  createAvailableRooms,
  updateWelcomeUser,
  updateTotalCost,
  updateSecondaryCosts,
  updateUserElements,
  displayElements,
};
