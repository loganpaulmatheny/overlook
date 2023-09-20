// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import "./css/styles.css";

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import "./images/turing-logo.png";
console.log("This is the JavaScript entry file - your code begins here.");

// ===== IMPORTS ======
import { getRooms, getUserData, getCustomerBookings } from "./apiCalls";
import { calculateRoomCosts } from "./customer";
import {
  createBookings,
  updateTotalCost,
  updateSecondaryCosts,
} from "./domUpdates";

// ===== QUERY SELECTORS =====
const form = document.querySelector(".login-form");
const usernameInput = document.querySelector("#username");
const pastCosts = document.querySelector(".past-costs-amount");
const upcomingCosts = document.querySelector(".upcoming-costs-amount");

// ===== GLOBAL VARIABLES =====
var currentUser;
var currentUserBookings;
var userPastCosts;
var userUpcomingCosts;
var userTotalCosts;
var rooms;

// ===== EVENT LISTENERS =====
window.addEventListener("load", function (event) {
  getRooms().then((data) => {
    rooms = data.rooms;
    // console.log(rooms);
  });
});

form.addEventListener("submit", function (event) {
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
        updateTotalCost(userTotalCosts);
        updateSecondaryCosts(userPastCosts, pastCosts);
        createBookings(bookings.pastBookings, rooms);
        // i need to build the bookings
        // finally call the display function
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

export { rooms };
