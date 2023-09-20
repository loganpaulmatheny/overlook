import { getUserBookings } from "./customer";

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

export { getUserData, getCustomerBookings, getRooms };
