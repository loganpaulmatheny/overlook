const getUser = (userId) => {
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

const getCustBookings = (userId) => {
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

export const getUserData = getUser;