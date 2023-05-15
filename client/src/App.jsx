import axios from "axios";
import { Route, Routes } from "react-router";
import "./App.css";
import Layout from "./components/Layout";
import ProfilePage from "./pages/ProfilePage";
import Indexpage from "./pages/Indexpage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserContextProvider } from "./pages/userContext";
import PlacesPage from "./pages/PlacesPage";
import PlacesForm from "./pages/PlacesForm";

axios.defaults.baseURL = "http://127.0.0.1:4000/api/v1";
axios.defaults.withCredentials = true;
function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Indexpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesForm />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
