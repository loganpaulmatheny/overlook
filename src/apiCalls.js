import { getUserBookings } from "./customer";
import { getAvailableBookings } from "./reservations";

const getRooms = () => {
  return fetch(`http://localhost:3001/api/v1/rooms`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Get network response was not ok: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error(`Error fetching room info: ${error}`);
    });
};

const getUserData = (userId) => {
  return fetch(`http://localhost:3001/api/v1/customers/${userId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Get network response was not ok: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error(`Error fetching user info: ${error}`);
    });
};

const getCustomerBookings = (userId) => {
  return fetch(`http://localhost:3001/api/v1/bookings`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Get network response was not ok: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      let bookings = data.bookings;
      let userBookings = getUserBookings(userId, bookings);
      return userBookings;
    })
    .catch((error) => {
      console.error(`Error fetching customer bookings info: ${error}`);
    });
};

const availableBookings = (date, rooms) => {
  return fetch(`http://localhost:3001/api/v1/bookings`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Get network response was not ok: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      let bookings = data.bookings;
      let availableBookings = getAvailableBookings(date, rooms, bookings);
      // insert function here that creates the available bookings array
      return availableBookings;
    })
    .catch((error) => {
      console.error(`Error fetching customer bookings info: ${error}`);
    });
};

const bookRoom = (date, room, userId) => {
  const root = `http://localhost:3001/api/v1/bookings`;
  const recipeBody = { userID: userId, date: date, roomNumber };

  // Make the POST request
  return fetch(root, {
    method: "POST",
    body: JSON.stringify(recipeBody),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((postResponse) => {
      if (!postResponse.ok) {
        throw new Error(
          `POST network response was not ok: ${postResponse.status}`
        );
      }

      // Wait for the POST request to complete, then make the GET request
      return fetch(`http://localhost:3001/api/v1/users`);
    })
    .then((getUsersResponse) => {
      if (!getUsersResponse.ok) {
        throw new Error(
          `GET network response was not ok: ${getUsersResponse.status}`
        );
      }

      // Parse and return the updated users data

      return getUsersResponse.json();
    })
    .catch((error) => {
      console.error(`Error: ${error}`);
    });
};

export { getUserData, getCustomerBookings, getRooms, availableBookings };
