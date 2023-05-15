import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const userContext = createContext({});
export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setready] = useState(false);
  const [logoutStatus, setLogoutStatus] = useState(false);
  useEffect(() => {
    if(!user)
    {
    axios.get("/user/profile").then(({ data }) => {
      setUser(data);
     setready(true)
    });
  }
  }, []);

  return (
    <userContext.Provider value={{ user, setUser, ready, setLogoutStatus,setready }}>
      {children}
    </userContext.Provider>
  );
}
