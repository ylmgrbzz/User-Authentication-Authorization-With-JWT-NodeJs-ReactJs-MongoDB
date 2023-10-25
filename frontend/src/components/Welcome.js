import axios from "axios";
import React, { useEffect, useState } from "react";
axios.defaults.withCredentials = true;

const Welcome = () => {
  const [user, setUser] = useState([]);
  const sendRequest = async () => {
    const response = await axios
      .get("http://localhost:5000/api/user")
      .catch((error) => {
        console.log(error);
      });
    const data = await response.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => {
      if (data.success) {
        setUser(data.user);
      }
    });
  }, []);

  return (
    <div>
      {user && (
        <div>
          <h1>Welcome {user.name}</h1>
          <h2>Your email is {user.email}</h2>
        </div>
      )}
    </div>
  );
};

export default Welcome;
