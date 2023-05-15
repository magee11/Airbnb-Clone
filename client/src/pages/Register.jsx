import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
function Register() {
  const [firstname, setFirstName] = useState("");
  const [secondname, setSecondName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  function registerUser(e) {
    e.preventDefault();
    try {
      axios.post("/user/register", {
        firstname,
        secondname,
        phone,
        email,
        password,
      });
      alert("Registration Successful! Now you can Login");
    } catch {
      alert("Resgistration Failed! please try again");
    }
  }
  return (
    <div className="mt-20">
      <h1 className="text-4xl text-center">Register</h1>
      <form className="max-w-md mx-auto  mt-7" onSubmit={registerUser}>
        <input
          type="text"
          placeholder="First Name"
          value={firstname}
          onChange={(ev) => setFirstName(ev.target.value)}
        />
        <input
          type="text"
          placeholder="Second Name"
          value={secondname}
          onChange={(ev) => setSecondName(ev.target.value)}
        />
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(ev) => setPhone(ev.target.value)}
        />
        <div class="mt-3 pl-3 items-center">
          <input type="checkbox" className="mr-2" />
          <label for="checkbox" className="mt-2">
            I agree to these <a href="#">Terms and Conditions</a>.
          </label>
        </div>
        <button className="primary mt-2">Register</button>
      </form>
      <div className="text-center py-2 text-gray-500">
        Already a Member?
        <Link className="text-black underline" to={"/login"}>
          Login
        </Link>
      </div>
    </div>
  );
}

export default Register;
