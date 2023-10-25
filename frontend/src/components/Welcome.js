import axios from "axios";
import React, { useEffect, useState } from "react";
axios.defaults.withCredentials = true;
let firstRender = true;
const Welcome = () => {
  const [user, setUser] = useState();
  const refreshToken = async () => {
    const response = await axios
      .get("http://localhost:5000/api/refresh", {
        withCredentials: true,
      })
      .catch((error) => {
        console.log(error);
      });
    const data = await response.data;
    return data;
  };
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
    if (firstRender) {
      firstRender = false;
      sendRequest().then((data) => {
        if (data.success) {
          setUser(data.user);
        }
      });
      let interval = setInterval(() => {
        refreshToken().then((data) => {
          if (data.success) {
            setUser(data.user);
          }
        });
      }, 60000);
      return () => clearInterval(interval);
    }
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
