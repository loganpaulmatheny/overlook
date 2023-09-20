// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import "./css/styles.css";

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import "./images/turing-logo.png";
console.log("This is the JavaScript entry file - your code begins here.");

// ===== IMPORTS ======
import {
  getRooms,
  getUserData,
  getCustomerBookings,
  availableBookings,
} from "./apiCalls";
import {
  createBookings,
  updateWelcomeUser,
  updateTotalCost,
  updateSecondaryCosts,
  displayElements,
} from "./domUpdates";
import { calculateRoomCosts } from "./customer";
import { getAvailableBookings } from "./reservations";

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

// ===== GLOBAL VARIABLES =====
var currentUser;
var currentUserBookings;
var userPastCosts;
var userUpcomingCosts;
var userTotalCosts;
var rooms;
var reservationDate;

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

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let user = usernameInput.value;
  let userId = user.match(/\d+/)[0];
  getUserData(userId).then((user) => {
    currentUser = user;
    // console.log(currentUser);
    getCustomerBookings(currentUser.id).then(
      (bookings) => {
        // console.log(bookings)
        currentUserBookings = bookings;
        userPastCosts = calculateRoomCosts(bookings.pastBookings, rooms);
        userUpcomingCosts = calculateRoomCosts(
          bookings.upcomingBookings,
          rooms
        );
        userTotalCosts = userPastCosts + userUpcomingCosts;
        // console.log(userTotalCosts);
        updateWelcomeUser(currentUser);
        updateTotalCost(userTotalCosts);
        updateSecondaryCosts(userPastCosts, pastCostsAmount);
        updateSecondaryCosts(userUpcomingCosts, upcomingCostsAmount);
        createBookings(bookings.pastBookings, rooms);
        // i need to build the bookings
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
  availableBookings(reservationDate, rooms).then((availableBookings) => {
    console.log(availableBookings);
  });
});

export { rooms };
