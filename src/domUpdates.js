const bookingsArea = document.querySelector(".bookings-area");
const welcomeMessage = document.querySelector(".welcome");
const userIdMessage = document.querySelector(".userIdMessage");
const costArea = document.querySelector(".total-cost");
const availableRoomsArea = document.querySelector(".available-rooms");
const upcomingCostsAmount = document.querySelector(".upcoming-costs-amount");
const pastCostsAmount = document.querySelector(".past-costs-amount");
const loginError = document.querySelector(".login-error");
const generalError = document.querySelector(".general-error");
const roomBooked = document.querySelector(".room-booked");

import { checkUsername, checkPassword } from "./login";

const createBookings = (bookings, rooms) => {
  bookingsArea.innerHTML = "";
  bookings.forEach((booking) => {
    let roomInformation = rooms.find((room) => {
      return room.number === booking.roomNumber;
    });
    bookingsArea.innerHTML += `
      <div class="user-booking">
        <h2 class="user-room">${roomInformation.roomType}</h2>
        <p>Date: ${booking.date}</P>
        <p>Price: $${roomInformation.costPerNight}</p>
      </div>
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
      <div class="available-rooms-card" id="${availableRoom.number}" > 
        <h2 tabindex="0">Room Type: ${availableRoom.roomType}</h2>
        <p>Room Number: ${availableRoom.number}</p>
        <p>Beds: ${availableRoom.numBeds} x ${availableRoom.bedSize}</p>
        <p>Cost per Night: $${availableRoom.costPerNight}</p>
        <button class="tertiary-button book-button">Book Room</button>
      </div>
      `;
    });
  }
};

const updateWelcomeUser = (user) => {
  welcomeMessage.innerHTML = `Welcome home, ${user.name}`;
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

const checkLogin = (user, pass) => {
  let usernameStatus = checkUsername(user);
  let passwordStatus = checkPassword(pass);
  if (usernameStatus === true && passwordStatus === true) {
    loginError.classList.toggle("hidden", true);
    return true;
  } else if (usernameStatus === false) {
    loginError.classList.toggle("hidden", false);
    loginError.innerHTML = "";
    loginError.innerHTML +=
      "Looks like your username might be slighly off - check it again";
    return false;
  } else if (passwordStatus === false) {
    loginError.classList.toggle("hidden", false);
    loginError.innerHTML = "";
    loginError.innerHTML += "Incorrect password";
    return false;
  }
};

const createError = (error) => {
  generalError.classList.toggle("hidden", false);
  generalError.innerHTML = "";
  generalError.innerHTML += `We're sorry there's an error happening on the network`;
  setTimeout(() => {
    generalError.classList.toggle("hidden", true);
  }, 2000);
};

const showRoomBooked = () => {
  roomBooked.classList.toggle("hidden", false);
  setTimeout(() => {
    roomBooked.classList.toggle("hidden", true);
  }, 1500);
};

export {
  createBookings,
  createAvailableRooms,
  updateWelcomeUser,
  updateTotalCost,
  updateSecondaryCosts,
  updateUserElements,
  displayElements,
  checkUsername,
  checkPassword,
  checkLogin,
  createError,
  showRoomBooked,
};
