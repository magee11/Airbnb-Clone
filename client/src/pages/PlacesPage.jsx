import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountNav from "../components/AccountNav";

function PlacesPage() {
  const [places,setPlaces] = useState([])
  useEffect(()=>{
    axios.get('/user/added_places').then(({data})=>{
      console.log(data);
      setPlaces(data);
    })
  },[])
  return (
    <div>
      <AccountNav />
      <div className="text-center">
        List of all added places
        <Link
          className="bg-primary py-2 px-6 rounded-full inline-flex m-4 text-white"
          to={"/account/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m6-6H6"
            />
          </svg>
          Add New Places
        </Link>
      </div>
    </div>
  );
}

export default PlacesPage;
