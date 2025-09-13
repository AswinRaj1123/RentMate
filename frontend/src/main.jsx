import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

// 🔹 General / Landing
import App from "./App.jsx";
import { MainPage } from "./components/main_page/main_page.jsx";
import { MainSearchPage } from "./User/Main_search_page.jsx";

// 🔹 Authentication
import { LoginPage } from "./components/login_page/login_page.jsx"; 
import { SignUpPage } from "./components/Signup_page/Signup_page.jsx";
import { OtpPage } from "./components/Otp_page/Otp_page.jsx";
import { ForgetPassword } from "./components/Forgot_password/forgot_password.jsx";
import { ForgetAuth } from "./components/Forgot_auth/forgot_auth.jsx";
import { ResetPassword } from "./components/Forgot_new/reset_password.jsx";

// 🔹 User Pages
import { ProfilePage } from "./components/Profile_page/Profile_page.jsx";
import { PropertyDetails } from "./User/Property_page.jsx";
import { SearchResultPage } from "./User/Search_page.jsx";
import { MemberDetails } from "./User/members.jsx";

// 🔹 Landlord Pages
import { PropertyPage } from "./Landlord/Add_Property_page.jsx";
import { MyProperties } from "./Landlord/My_property.jsx";
import { ViewApplication } from "./Landlord/View_application.jsx";
import { LandlordProfile } from "./components/Landlord_profile/Landlord_profile.jsx";

// 🔹 Admin
import { AdminPage } from "./Admin/admin_page.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* ----------------- General / Landing ----------------- */}
        <Route path="/" element={<App />} />
        <Route path="/home" element={<MainPage />} />
        <Route path="/mainsearch" element={<MainSearchPage />} />

        {/* ----------------- Authentication ----------------- */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/forgot-auth" element={<ForgetAuth />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* ----------------- User Pages ----------------- */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/property" element={<PropertyDetails />} />
        <Route path="/search" element={<SearchResultPage />} />
        <Route path="/members" element={<MemberDetails />} />

        {/* ----------------- Landlord Pages ----------------- */}
        <Route path="/addproperty" element={<PropertyPage />} />
        <Route path="/myproperties" element={<MyProperties />} />
        <Route path="/viewapplication" element={<ViewApplication />} />
        <Route path="/landlordprofile" element={<LandlordProfile />} />

        {/* ----------------- Admin ----------------- */}
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);