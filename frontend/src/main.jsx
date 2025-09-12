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
import { AdminPage } from "./Admin/admin_page.jsx";
import {PropertyPage} from "./Landlord/Add_Property_page.jsx";
import { SignUpPage } from "./components/Signup_page/Signup_page.jsx";
import { MyProperties } from "./Landlord/My_property.jsx";
// import {LanlordProfile} from "./components/Landlord_profile/Landlord_profile.jsx";
import { MemberDetails } from "./User/members.jsx";
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
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/addproperty" element={<PropertyPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/myproperties" element={<MyProperties />} />
        {/* <Route path="/landlordprofile" element={<LanlordProfile />} /> */}
        <Route path="/members" element={<MemberDetails />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);