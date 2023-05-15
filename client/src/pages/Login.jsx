import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { userContext } from "./userContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser, setready } = useContext(userContext);
  function loginUser(e) {
    e.preventDefault();
    try {
      axios
        .post("/user/login", { email, password }, { withCredentials: true })
        .then((data) => setUser(data.data));
      setRedirect(true);
    } catch {
      alert("Couldn't login");
    }
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="mt-20">
      <h1 className="text-4xl text-center">Login</h1>
      <form className="max-w-md mx-auto  mt-7" onSubmit={loginUser}>
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button className="primary mt-2">Login</button>
      </form>
      <div className="text-center py-2 text-gray-500">
        Don't have an account yet?
        <Link className="text-black underline" to={"/register"}>
          {" "}
          Register
        </Link>
      </div>
    </div>
  );
}

export default Login;
