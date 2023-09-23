// ===== NPM PACKAGE =====
import { format } from "date-fns";

// ===== IMPORTS ======
import "./css/styles.css";
import {
  getRooms,
  getUserData,
  getCustomerBookings,
  availableBookings,
  bookRoom,
} from "./apiCalls";
import {
  createBookings,
  updateUserElements,
  displayElements,
  createAvailableRooms,
  checkLogin,
} from "./domUpdates";
import { calculateRoomCosts } from "./customer";
import { filterAvailableRooms, getAvailableBookings } from "./reservations";

// ===== QUERY SELECTORS =====
// FORMATTING
const body = document.body;
const logoBox = document.querySelector(".logo-box");
const hotelInformation = document.querySelector(".hotel-information");

// LOGIN
const loginArea = document.querySelector(".login-area");
const loginForm = document.querySelector(".login-form");
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#pass");

// NAVBAR
const navigationArea = document.querySelector(".navigation");
const navBar = document.querySelector(".nav-bar");
const makeReservationButton = document.querySelector(
  ".make-reservation-button"
);

// USER INFO
const userData = document.querySelector(".user-data");
const totalCostHeader = document.querySelector(".total-cost");

// CUSTOMER INFO
const upcomingReservationsButton = document.querySelector(
  ".upcoming-reservations"
);
const customerInformation = document.querySelector(".customer-information");
const pastReservationsButton = document.querySelector(".past-reservations");
const reservationCosts = document.querySelector(".reservation-costs");
const pastCosts = document.querySelector(".past-costs");
const upcomingCosts = document.querySelector(".upcoming-costs");

// BOOKINGS
const bookingsArea = document.querySelector(".bookings-area");

// RESERVATIONS
const makeReservationsArea = document.querySelector(".make-reservations-area");
const dateForm = document.querySelector(".date-selection-form");
const reservationDateInput = document.querySelector("#reservationDate");
const roomTagFilters = document.querySelector(".room-tag-filters");
const availableRoomsArea = document.querySelector(".available-rooms");
const viewReservations = document.querySelector(".view-my-reservations");

// ===== GLOBAL VARIABLES =====
var currentUser;
var currentUserBookings;
var userPastCosts;
var userUpcomingCosts;
var userTotalCosts;
var rooms;
// stores the rooms types from initial request
var reservationDate;
var availableRooms;
var roomTypeFilter;
// var bookingsAll;

// ===== EVENT LISTENERS =====
window.addEventListener("load", function (event) {
  getRooms().then((data) => {
    rooms = data.rooms;
  });
  displayElements(
    [loginArea],
    [navBar, customerInformation, bookingsArea, makeReservationsArea]
  );
});

const updateCustomerInformation = (customerBookings, rooms, currentUser) => {
  currentUserBookings = customerBookings;
  userPastCosts = calculateRoomCosts(customerBookings.pastBookings, rooms);
  userUpcomingCosts = calculateRoomCosts(
    customerBookings.upcomingBookings,
    rooms
  );
  userTotalCosts = userPastCosts + userUpcomingCosts;
  updateUserElements(
    currentUser,
    userTotalCosts,
    userPastCosts,
    userUpcomingCosts
  );
  createBookings(customerBookings.pastBookings, rooms);
};

// This function needs to be in the scripts file because it is updating global variables, along with other dom manipulations

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let user = usernameInput.value;
  let pass = passwordInput.value;
  let formStatus = checkLogin(user, pass);
  if (formStatus === true) {
    let userId = user.match(/\d+/)[0];
    body.classList.add("app-background");
    logoBox.classList.add("changed");

    displayElements(
      [navBar, userData, hotelInformation],
      [loginArea, upcomingCosts, makeReservationsArea]
    );
    getUserData(userId).then((user) => {
      currentUser = user;
    });
  }
});

pastReservationsButton.addEventListener("click", function (event) {
  createBookings(currentUserBookings.pastBookings, rooms);
  displayElements(
    [navBar, pastCosts, customerInformation, bookingsArea],
    [loginArea, upcomingCosts, makeReservationsArea]
  );
});

upcomingReservationsButton.addEventListener("click", function (event) {
  createBookings(currentUserBookings.upcomingBookings, rooms);
  displayElements(
    [navBar, upcomingCosts, customerInformation, bookingsArea],
    [loginArea, pastCosts, makeReservationsArea]
  );
});

makeReservationButton.addEventListener("click", function (event) {
  displayElements(
    [navigationArea, makeReservationsArea],
    [loginArea, customerInformation, totalCostHeader]
  );
});

dateForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let date = reservationDateInput.value;
  reservationDate = new Date(date);
  reservationDate.setHours(reservationDate.getHours() + 4);
  console;
  // Fixes the date so it can be compared to the resrvations
  availableBookings(reservationDate, rooms).then((availableBookings) => {
    roomTypeFilter = "all";
    availableRooms = availableBookings;
    createAvailableRooms(availableRooms);
  });
});

roomTagFilters.addEventListener("click", function (event) {
  let tagId = event.target.id;
  let filteredRooms = filterAvailableRooms(tagId, availableRooms);
  console.log(filteredRooms);
  createAvailableRooms(filteredRooms);
});

availableRoomsArea.addEventListener("click", function (event) {
  handleBookRoom(event);
});

availableRoomsArea.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    handleBookRoom(event);
  }
});

function handleBookRoom(event) {
  let roomClicked = event.target.parentElement.id;
  roomClicked = parseInt(roomClicked);
  let date = format(reservationDate, "yyyy/MM/dd");
  // Use of npm-formatter to parse the date in the form needed for the POST
  bookRoom(currentUser.id, date, roomClicked).then((updatedBookings) => {
    reservationDate = new Date(date);
    // Parses the reservation date that was converted for the POST back into a date format that can be used for looking up available rooms
    availableRooms = getAvailableBookings(
      reservationDate,
      rooms,
      updatedBookings.bookings
    );
    createAvailableRooms(availableRooms);
    displayElements(
      [navigationArea, makeReservationsArea],
      [loginArea, customerInformation]
    );
  });
}

viewReservations.addEventListener("click", function (event) {
  getCustomerBookings(currentUser.id).then((customerBookings) => {
    updateCustomerInformation(customerBookings, rooms, currentUser);
    displayElements(
      [navBar, pastCosts, customerInformation, bookingsArea, userData],
      [loginArea, upcomingCosts, makeReservationsArea, hotelInformation]
    );
  });
});
