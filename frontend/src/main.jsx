import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { MainPage } from "./components/main_page/main_page.jsx";
import { LoginPage } from "./components/login_page/login_page.jsx"; 
import { OtpPage } from "./components/Otp_page/Otp_page.jsx";
import {ProfilePage} from "./components/Profile_page/Profile_page.jsx";
import { PropertyDetails } from "./User/Property_page.jsx";
import { SearchResultPage } from "./User/Search_page.jsx";
// import { MyProperties } from "./Landlord/My_property.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<MainPage />} />
          <Route path="/otp" element={<OtpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/property" element={<PropertyDetails />} />
        <Route path="/search" element={<SearchResultPage />} />
        {/* <Route path="/myproperties" element={<MyProperties />} /> */}
        <Route path="/app" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);