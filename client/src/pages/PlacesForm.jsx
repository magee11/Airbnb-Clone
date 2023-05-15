import React from "react";
import { useState } from "react";
import Perks from "../components/Perks";
import PhotoUploader from "../components/PhotoUploader";
import axios from "axios";
import AccountNav from "../components/AccountNav";
import { Navigate } from "react-router-dom";
function PlacesForm() {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [descriptions, setDescriptions] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirect, setRedirect] = useState(false);

  async function addNewPlace(ev) {
    ev.preventDefault();
    await axios.post("/user/places", {
      title,
      address,
      addedPhotos,
      descriptions,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    });
    setRedirect(true);
  }
  console.log(redirect);

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div>
      <AccountNav />
      <div>
        <form onSubmit={addNewPlace}>
          <h2 className="text-2xl mt-4">Title</h2>
          <p className="text-gray-500 text-sm"> Tile for your place</p>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(ev) => {
              setTitle(ev.target.value);
            }}
          />
          <h2 className="text-2xl mt-4">Address</h2>
          <p className="text-gray-500 text-sm"> Address to your place</p>
          <input
            type="text"
            placeholder="Adress"
            value={address}
            onChange={(ev) => {
              setAddress(ev.target.value);
            }}
          />
          <div>
            <PhotoUploader
              addedPhotos={addedPhotos}
              onChange={setAddedPhotos}
            />
          </div>

          <h2 className="text-2xl mt-4">Descriptions</h2>
          <p className="text-gray-500 text-sm">Descriptions of the place</p>
          <textarea
            value={descriptions}
            onChange={(ev) => {
              setDescriptions(ev.target.value);
            }}
          />
          <div>
            <Perks selected={perks} onChange={setPerks} />
          </div>
          <div></div>
          <h2 className="text-2xl mt-4">Extra Info</h2>
          <p className="text-gray-500 text-sm">house rules, etc ..</p>
          <textarea
            value={extraInfo}
            onChange={(ev) => {
              setExtraInfo(ev.target.value);
            }}
          />
          <h2 className="text-2xl mt-4">CheckIn and Checkout time </h2>
          <p className="text-gray-500 text-sm">
            Add check in and checkout time u
          </p>
          <div className="grid grid-cols-3 items-center mt-2">
            <div>
              <h3 className="">Check in time </h3>
              <input
                type="time"
                placeholder="12:00"
                value={checkIn}
                onChange={(ev) => {
                  setCheckIn(ev.target.value);
                }}
              />
            </div>
            <div>
              <h3>Check out time </h3>
              <input
                type="time"
                placeholder="12:00"
                value={checkOut}
                onChange={(ev) => {
                  setCheckOut(ev.target.value);
                }}
              />
            </div>
            <div>
              <h3>Maximum guest allowed</h3>
              <input
                type="number"
                placeholder="5"
                value={maxGuests}
                onChange={(ev) => {
                  setMaxGuests(ev.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <button className="primary m-3 max-w-sm justify-center items-center">
              save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PlacesForm;
