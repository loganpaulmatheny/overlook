// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import "./css/styles.css";

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import "./images/turing-logo.png";
console.log("This is the JavaScript entry file - your code begins here.");

// ===== NPM PACKAGE =====
import { format } from "date-fns";

// ===== IMPORTS ======
import {
  getRooms,
  getUserData,
  getCustomerBookings,
  availableBookings,
  bookRoom,
} from "./apiCalls";
import {
  createBookings,
  updateWelcomeUser,
  updateTotalCost,
  updateSecondaryCosts,
  displayElements,
  createAvailableRooms,
} from "./domUpdates";
import { calculateRoomCosts } from "./customer";
import { filterAvailableRooms, getAvailableBookings } from "./reservations";

// ===== QUERY SELECTORS =====
const navigationArea = document.querySelector(".navigation");
const navBar = document.querySelector(".nav-bar");
const loginArea = document.querySelector(".login-area");
const loginForm = document.querySelector(".login-form");
const usernameInput = document.querySelector("#username");
const customerInformation = document.querySelector(".customer-information");
const pastReservationsButton = document.querySelector(".past-reservations");
const upcomingReservationsButton = document.querySelector(
  ".upcoming-reservations"
);
const reservationCosts = document.querySelector(".reservation-costs");
const pastCosts = document.querySelector(".past-costs");
const pastCostsAmount = document.querySelector(".past-costs-amount");
const upcomingCosts = document.querySelector(".upcoming-costs");
const bookingsArea = document.querySelector(".bookings-area");
const upcomingCostsAmount = document.querySelector(".upcoming-costs-amount");
const makeReservationButton = document.querySelector(
  ".make-reservation-button"
);
const makeReservationsArea = document.querySelector(".make-reservations-area");
const dateForm = document.querySelector(".date-selection-form");
const reservationDateInput = document.querySelector("#reservationDate");
const roomTagFilters = document.querySelector(".room-tag-filters");
const availableRoomsArea = document.querySelector(".available-rooms");

// ===== GLOBAL VARIABLES =====
var currentUser;
var currentUserBookings;
var userPastCosts;
var userUpcomingCosts;
var userTotalCosts;
var rooms;
var reservationDate;
var availableRooms;
var roomTypeFilter;
var bookingsAll;

// ===== EVENT LISTENERS =====
window.addEventListener("load", function (event) {
  getRooms().then((data) => {
    rooms = data.rooms;
    // console.log(rooms);
  });
  displayElements(
    [loginArea],
    [navBar, customerInformation, bookingsArea, makeReservationsArea]
  );
});

const updateCustomerInformation = (customerBookings, rooms, currentUser) => {
  // console.log(bookings)
  currentUserBookings = customerBookings;
  userPastCosts = calculateRoomCosts(customerBookings.pastBookings, rooms);
  userUpcomingCosts = calculateRoomCosts(
    customerBookings.upcomingBookings,
    rooms
  );
  userTotalCosts = userPastCosts + userUpcomingCosts;
  // console.log(userTotalCosts);
  updateWelcomeUser(currentUser);
  updateTotalCost(userTotalCosts);
  updateSecondaryCosts(userPastCosts, pastCostsAmount);
  updateSecondaryCosts(userUpcomingCosts, upcomingCostsAmount);
  createBookings(customerBookings.pastBookings, rooms);
  // i need to build the bookings
};

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let user = usernameInput.value;
  let userId = user.match(/\d+/)[0];
  getUserData(userId).then((user) => {
    currentUser = user;
    // console.log(currentUser);
    getCustomerBookings(currentUser.id).then(
      (customerBookings) => {
        updateCustomerInformation(customerBookings, rooms, currentUser);
        // finally call the display function
        displayElements(
          [navBar, pastCosts, customerInformation, bookingsArea],
          [loginArea, upcomingCosts, makeReservationsArea]
        );
      }
      // update the total costs
      // create the bookings on the DOM
      // display the bookings
    );
  });

  // get the numbers out of the submission
  // apiCall for the individual customer
  // thenable that sets currentUser here
  // apiCall all the bookings
  // thenable for
  // creating the user's rooms
  // calculate the costs
  console.log(userId);
});

// ====== PUT EVENT LISTENER FOR MY RESERVATIONS WITH BASICALLY THE SAME CODE AS ABOVE HERE =====

pastReservationsButton.addEventListener("click", function (event) {
  console.log("past bookings");
  console.log(currentUserBookings.pastBookings);
  createBookings(currentUserBookings.pastBookings, rooms);
  // i need to build the bookings
  // finally call the display function
  displayElements(
    [navBar, pastCosts, customerInformation, bookingsArea],
    [loginArea, upcomingCosts, makeReservationsArea]
  );
});

upcomingReservationsButton.addEventListener("click", function (event) {
  console.log("upcoming bookings");
  console.log(currentUserBookings.upcomingBookings);
  createBookings(currentUserBookings.upcomingBookings, rooms);
  // i need to build the bookings
  // finally call the display function
  displayElements(
    [navBar, upcomingCosts, customerInformation, bookingsArea],
    [loginArea, pastCosts, makeReservationsArea]
  );
});

makeReservationButton.addEventListener("click", function (event) {
  displayElements(
    [navigationArea, makeReservationsArea],
    [loginArea, customerInformation]
  );
});

dateForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let date = reservationDateInput.value;
  reservationDate = new Date(date);
  reservationDate.setHours(reservationDate.getHours() + 4);
  console.log(reservationDate);
  availableBookings(reservationDate, rooms).then((availableBookings) => {
    roomTypeFilter = "all";
    availableRooms = availableBookings;
    createAvailableRooms(availableRooms);
  });
});

roomTagFilters.addEventListener("click", function (event) {
  let tagId = event.target.id;
  // console.log(tagId);
  let filteredRooms = filterAvailableRooms(tagId, availableRooms);
  createAvailableRooms(filteredRooms);
});

availableRoomsArea.addEventListener("click", function (event) {
  let roomClicked = event.target.parentElement.id;
  roomClicked = parseInt(roomClicked);
  let date = format(reservationDate, "yyyy/MM/dd");
  // console.log(typeof date);
  // console.log(typeof currentUser.id);
  // console.log(typeof roomClicked);
  // use of npm-formatter to parse the date in the form needed for the POST
  bookRoom(currentUser.id, date, roomClicked).then((updatedBookings) => {
    reservationDate = new Date(date);
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
});

// event listener on my rooms
// createBookings(currentUserBookings.upcomingBookings, rooms);
// display function

export { rooms };
