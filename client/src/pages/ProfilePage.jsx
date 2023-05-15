import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import PlacesPage from "./PlacesPage";

import { userContext } from "./userContext";

function ProfilePage() {
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  const { ready, user, setUser ,setLogoutStatus} = useContext(userContext);
  const [redirect, setRedirect] = useState(null);

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }



  async function logout() {
    await axios.post("/user/logout");
    setUser(null);
    setLogoutStatus(true);

    setRedirect("/");
  }
  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div className="mx-20">
      <AccountNav/>
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto mt-2">
          Logined in as {user.name} ({user.email})<br />
          <button
            onClick={logout}
            className="primary text-white rounded-full max-w-sm mt-4"
          >
            logout
          </button>
        </div>
      )}
      {subpage === "places" && (
        <div>
          <PlacesPage />
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
