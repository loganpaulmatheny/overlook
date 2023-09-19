// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import "./css/styles.css";

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import "./images/turing-logo.png";
console.log("This is the JavaScript entry file - your code begins here.");

// ===== QUERY SELECTORS =====
const form = document.querySelector(".login-form");

// ===== GLOBAL VARIABLES =====
var currentUser;
var userPastCosts;
var userUpcomingCosts;
var userTotalCosts;

// ===== EVENT LISTENERS =====
form.addEventListener("submit", function (event) {
  event.preventDefault();
  // get the numbers out of the submission
  // apiCall for the individual customer
  // thenable that sets currentUser here
  // apiCall all the bookings
  // thenable for
  // creating the user's rooms
  // calculate the costs
  console.log("test");
});
