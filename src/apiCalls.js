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
      return error;
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
      return error;
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
      return error;
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
      return availableBookings;
    })
    .catch((error) => {
      console.error(`Error getting available bookings: ${error}`);
      return error;
    });
};

const bookRoom = (id, day, roomNum) => {
  const root = `http://localhost:3001/api/v1/bookings`;
  const reservationBody = { userID: id, date: day, roomNumber: roomNum };
  return fetch(root, {
    method: "POST",
    body: JSON.stringify(reservationBody),
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
      console.log(postResponse);

      return fetch(`http://localhost:3001/api/v1/bookings`);
    })
    .then((updatedBookingsResponse) => {
      if (!updatedBookingsResponse.ok) {
        throw new Error(
          `GET network response was not ok: ${updatedBookingsResponse.status}`
        );
      }

      return updatedBookingsResponse.json();
    })
    .catch((error) => {
      console.error(`Error booking rooms: ${error}`);
      return error;
    });
};

export {
  getUserData,
  getCustomerBookings,
  getRooms,
  availableBookings,
  bookRoom,
};
